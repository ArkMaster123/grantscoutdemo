import { Hono } from "hono";
import type { Env } from './core-utils';
import { GrantEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Ensure grant data is seeded on startup
  app.use('/api/grants/*', async (c, next) => {
    await GrantEntity.ensureSeed(c.env);
    await next();
  });
  // GET /api/grants - Fetch and filter grants
  app.get('/api/grants', async (c) => {
    const { q, category, minAmount, maxAmount } = c.req.query();
    // Fetch all grants first. For a larger dataset, this would be optimized with better indexing.
    const { items: allGrants } = await GrantEntity.list(c.env);
    let filteredGrants = allGrants;
    // Apply search query filter
    if (q) {
      const lowerCaseQuery = q.toLowerCase();
      filteredGrants = filteredGrants.filter(grant =>
        grant.title.toLowerCase().includes(lowerCaseQuery) ||
        grant.funder.toLowerCase().includes(lowerCaseQuery) ||
        grant.description.toLowerCase().includes(lowerCaseQuery)
      );
    }
    // Apply category filter
    if (category) {
      filteredGrants = filteredGrants.filter(grant => grant.category === category);
    }
    // Apply funding amount filters
    const min = minAmount ? parseInt(minAmount, 10) : null;
    const max = maxAmount ? parseInt(maxAmount, 10) : null;
    if (min !== null && !isNaN(min)) {
      filteredGrants = filteredGrants.filter(grant => grant.amount >= min);
    }
    if (max !== null && !isNaN(max)) {
      filteredGrants = filteredGrants.filter(grant => grant.amount <= max);
    }
    return ok(c, filteredGrants);
  });
  // GET /api/grants/:id - Fetch a single grant by ID
  app.get('/api/grants/:id', async (c) => {
    const { id } = c.req.param();
    if (!id) return bad(c, 'Grant ID is required');
    const grant = new GrantEntity(c.env, id);
    if (!(await grant.exists())) {
      return notFound(c, 'Grant not found');
    }
    const grantState = await grant.getState();
    return ok(c, grantState);
  });
}
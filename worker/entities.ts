/**
 * Defines the Grant entity for the application.
 * This replaces the demo entities and serves as the core data model for grants.
 */
import { IndexedEntity } from "./core-utils";
import type { Grant } from "@shared/types";
import { MOCK_GRANTS } from "@shared/mock-data";
// GRANT ENTITY: one DO instance per grant
export class GrantEntity extends IndexedEntity<Grant> {
  static readonly entityName = "grant";
  static readonly indexName = "grants";
  static readonly initialState: Grant = {
    id: "",
    title: "",
    funder: "",
    description: "",
    amount: 0,
    deadline: "",
    url: "",
    category: "",
  };
  static seedData = MOCK_GRANTS;
}
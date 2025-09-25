import { GrantGrid } from "@/components/GrantGrid";
import { SearchBar } from "@/components/SearchBar";
import { GrantDetail } from "@/components/GrantDetail";
export function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-background py-24 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,216,255,0.5),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(39,39,80,0.6),rgba(255,255,255,0))]"></div>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Find Your Next <span className="text-blue-600">Funding</span> Opportunity
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            GrantScout uses AI to help you discover grants, scholarships, and
            fellowships, tailored just for you.
          </p>
          <div className="mx-auto mt-10 flex max-w-2xl justify-center">
            <SearchBar />
          </div>
        </div>
      </section>
      {/* Grants Grid Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GrantGrid />
        </div>
      </section>
      {/* Grant Detail Modal */}
      <GrantDetail />
    </>
  );
}
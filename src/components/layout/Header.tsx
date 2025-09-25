import React from "react";
import { Link } from "react-router-dom";
import { Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGrantStore } from "@/hooks/useGrantStore";
import { ThemeToggle } from "@/components/ThemeToggle";
export const Header: React.FC = () => {
  const savedCount = useGrantStore((s) => s.savedGrantIds.size);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Feather className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            GrantScout
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link
              to="/"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Search Grants
            </Link>
            <Link
              to="/" // In a real app, this would be '/saved-grants'
              className="relative text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Saved Grants
              {savedCount > 0 && (
                <span className="absolute -right-4 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                  {savedCount}
                </span>
              )}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
             <ThemeToggle className="relative" />
             <Button className="hidden sm:inline-flex bg-blue-600 text-white hover:bg-blue-700">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
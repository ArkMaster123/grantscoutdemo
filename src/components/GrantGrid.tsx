import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";
import { GrantCard } from "@/components/GrantCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGrantStore } from "@/hooks/useGrantStore";
import { api } from "@/lib/api-client";
import type { Grant } from "@shared/types";
import { toast } from "sonner";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};
export const GrantGrid: React.FC = () => {
  const {
    searchQuery,
    category,
    minAmount,
    maxAmount,
    setGrants,
    isLoading,
    setIsLoading,
  } = useGrantStore();
  const grants = useGrantStore((s) => s.grants);
  const fetchGrants = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (category) params.append('category', category);
      params.append('minAmount', String(minAmount));
      params.append('maxAmount', String(maxAmount));
      const fetchedGrants = await api<Grant[]>(`/api/grants?${params.toString()}`);
      setGrants(fetchedGrants);
    } catch (error) {
      console.error("Failed to fetch grants:", error);
      toast.error("Failed to load grants. Please try again later.");
      setGrants([]); // Clear grants on error
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, category, minAmount, maxAmount, setIsLoading, setGrants]);
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchGrants();
    }, 300); // Debounce API calls
    return () => clearTimeout(debounceTimer);
  }, [fetchGrants]);
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 rounded-lg border p-4">
            <Skeleton className="h-8 w-1/3 rounded-md" />
            <Skeleton className="h-6 w-full rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
            <div className="flex-grow space-y-2 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
      </div>
    );
  }
  if (grants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 py-24 text-center">
        <SearchX className="h-16 w-16 text-muted-foreground" />
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
          No Grants Found
        </h2>
        <p className="mt-2 text-muted-foreground">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence>
        {grants.map((grant) => (
          <GrantCard key={grant.id} grant={grant} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
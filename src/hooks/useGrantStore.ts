import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Grant } from "@shared/types";
import { MOCK_GRANTS } from "@shared/mock-data";
const MAX_AMOUNT = Math.max(...MOCK_GRANTS.map((g) => g.amount), 0);
interface GrantState {
  grants: Grant[];
  searchQuery: string;
  category: string;
  minAmount: number;
  maxAmount: number;
  savedGrantIds: Set<string>;
  isLoading: boolean;
  selectedGrant: Grant | null;
  setGrants: (grants: Grant[]) => void;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setMinAmount: (amount: number) => void;
  setMaxAmount: (amount: number) => void;
  toggleSavedGrant: (id: string) => void;
  resetFilters: (maxAmountValue?: number) => void;
  setIsLoading: (loading: boolean) => void;
  setSelectedGrant: (grant: Grant | null) => void;
}
export const useGrantStore = create<GrantState>()(
  persist(
    (set) => ({
      grants: [],
      searchQuery: "",
      category: "",
      minAmount: 0,
      maxAmount: MAX_AMOUNT,
      savedGrantIds: new Set(),
      isLoading: true,
      selectedGrant: null,
      setGrants: (grants) => set({ grants }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setCategory: (category) => set({ category }),
      setMinAmount: (amount) => set({ minAmount: amount }),
      setMaxAmount: (amount) => set({ maxAmount: amount }),
      toggleSavedGrant: (id) =>
        set((state) => {
          const newSavedGrantIds = new Set(state.savedGrantIds);
          if (newSavedGrantIds.has(id)) {
            newSavedGrantIds.delete(id);
          } else {
            newSavedGrantIds.add(id);
          }
          return { savedGrantIds: newSavedGrantIds };
        }),
      resetFilters: (maxAmountValue = MAX_AMOUNT) =>
        set({
          category: "",
          minAmount: 0,
          maxAmount: maxAmountValue,
        }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setSelectedGrant: (grant) => set({ selectedGrant: grant }),
    }),
    {
      name: "grant-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        savedGrantIds: Array.from(state.savedGrantIds),
      }),
      // Rehydrate Set from stored array
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.savedGrantIds = new Set(state.savedGrantIds as unknown as string[]);
        }
      },
    }
  )
);
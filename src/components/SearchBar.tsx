import React from "react";
import { DollarSign, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useGrantStore } from "@/hooks/useGrantStore";
import { MOCK_GRANTS } from "@shared/mock-data";
const categories = [...new Set(MOCK_GRANTS.map((g) => g.category))];
const MAX_AMOUNT = Math.max(...MOCK_GRANTS.map((g) => g.amount));
export const SearchBar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    resetFilters,
  } = useGrantStore();
  const isFiltered = category || minAmount > 0 || maxAmount < MAX_AMOUNT;
  const handleReset = () => {
    resetFilters(MAX_AMOUNT);
  };
  return (
    <div className="w-full max-w-4xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by keyword, funder, or description..."
          className="h-14 w-full rounded-full bg-card pl-12 pr-40 text-base shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                className="h-10 rounded-full bg-muted hover:bg-muted/80"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {isFiltered && <span className="ml-2 h-2 w-2 rounded-full bg-blue-500" />}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filters</h4>
                  <p className="text-sm text-muted-foreground">
                    Refine your grant search.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Funding Amount</Label>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${minAmount.toLocaleString()}</span>
                    <span>${maxAmount.toLocaleString()}</span>
                  </div>
                  <Slider
                    defaultValue={[minAmount, maxAmount]}
                    min={0}
                    max={MAX_AMOUNT}
                    step={1000}
                    onValueChange={([min, max]) => {
                      setMinAmount(min);
                      setMaxAmount(max);
                    }}
                  />
                </div>
                {isFiltered && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="justify-self-start text-blue-600 hover:text-blue-700"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reset Filters
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <Button type="submit" className="h-10 rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};
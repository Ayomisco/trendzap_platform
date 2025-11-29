"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SearchFiltersProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  category: string
  priceRange: [number, number]
  minHolders: number
  verified: boolean
  sortBy: string
}

export function SearchFilters({ onSearch, onFilterChange }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priceRange: [0, 100],
    minHolders: 0,
    verified: false,
    sortBy: "trending",
  })
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
    updateActiveFilters(newFilters)
  }

  const updateActiveFilters = (currentFilters: FilterState) => {
    const active: string[] = []
    if (currentFilters.category !== "all") active.push(`Category: ${currentFilters.category}`)
    if (currentFilters.priceRange[0] > 0 || currentFilters.priceRange[1] < 100)
      active.push(`Price: $${currentFilters.priceRange[0]}-$${currentFilters.priceRange[1]}`)
    if (currentFilters.minHolders > 0) active.push(`Min Holders: ${currentFilters.minHolders}`)
    if (currentFilters.verified) active.push("Verified Only")
    setActiveFilters(active)
  }

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      category: "all",
      priceRange: [0, 100],
      minHolders: 0,
      verified: false,
      sortBy: "trending",
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
    setActiveFilters([])
  }

  const removeFilter = (filterText: string) => {
    const newFilters = { ...filters }
    if (filterText.startsWith("Category:")) newFilters.category = "all"
    if (filterText.startsWith("Price:")) newFilters.priceRange = [0, 100]
    if (filterText.startsWith("Min Holders:")) newFilters.minHolders = 0
    if (filterText === "Verified Only") newFilters.verified = false
    setFilters(newFilters)
    onFilterChange(newFilters)
    updateActiveFilters(newFilters)
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tweets, creators, or topics..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 glass bg-card/50 border-white/10"
          />
        </div>

        {/* Filter Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="glass bg-transparent relative">
              <Filter className="w-4 h-4" />
              {activeFilters.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-xs flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="glass border-white/10 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your search with advanced filters</SheetDescription>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={filters.category} onValueChange={(v) => handleFilterChange("category", v)}>
                  <SelectTrigger className="glass bg-card/50 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="crypto">Crypto & Web3</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <Label>
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(v) => handleFilterChange("priceRange", v)}
                  min={0}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>

              {/* Min Holders */}
              <div className="space-y-3">
                <Label>Minimum Holders: {filters.minHolders}</Label>
                <Slider
                  value={[filters.minHolders]}
                  onValueChange={(v) => handleFilterChange("minHolders", v[0])}
                  min={0}
                  max={1000}
                  step={10}
                  className="py-4"
                />
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={filters.sortBy} onValueChange={(v) => handleFilterChange("sortBy", v)}>
                  <SelectTrigger className="glass bg-card/50 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="new">Newest</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="volume">Highest Volume</SelectItem>
                    <SelectItem value="gainers">Top Gainers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Verified Only */}
              <div className="flex items-center justify-between">
                <Label>Verified Creators Only</Label>
                <Button
                  variant={filters.verified ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange("verified", !filters.verified)}
                  className={filters.verified ? "" : "glass bg-transparent"}
                >
                  {filters.verified ? "On" : "Off"}
                </Button>
              </div>

              {/* Clear Filters */}
              <Button variant="outline" className="w-full glass bg-transparent" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="glass bg-primary/20 gap-1">
              {filter}
              <button onClick={() => removeFilter(filter)} className="hover:text-foreground">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 text-xs">
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X } from "lucide-react";
import MintHotelCard from "@/components/MintHotelCard";
import { hotels } from "@/data/hotels";

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);

  // Basic filtering and sorting functionality
  const filteredHotels = hotels.filter(hotel => {
    // Filter by search query
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by price range
    const matchesPrice = hotel.tokenPrice >= priceRange[0] && hotel.tokenPrice <= priceRange[1];
    
    return matchesSearch && matchesPrice && hotel.location == 'London, United Kingdom';
  });

  // Sort hotels based on selection
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.tokenPrice - b.tokenPrice;
      case "price-high":
        return b.tokenPrice - a.tokenPrice;
      case "rating":
        return b.rating - a.rating;
      case "discount":
        return b.discount - a.discount;
      default: // recommended
        return 0; // Keep original order
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block space-y-6">
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-medium mb-4">Filters</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <div className="pt-4 px-2">
                      <Slider 
                        defaultValue={[0, 500]} 
                        max={500} 
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange} 
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All locations</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="asia">Asia</SelectItem>
                        <SelectItem value="caribbean">Caribbean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rating</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any rating</SelectItem>
                        <SelectItem value="4.5+">4.5+ stars</SelectItem>
                        <SelectItem value="4+">4+ stars</SelectItem>
                        <SelectItem value="3+">3+ stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button variant="outline" className="w-full">Reset Filters</Button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="space-y-6">
              {/* Search and Sort Bar */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search hotels, locations..." 
                    className="pl-9" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="discount">Biggest Discount</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="md:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Mobile Filters */}
              {showFilters && (
                <div className="md:hidden bg-card rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Filters</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Price Range</label>
                      <div className="pt-4 px-2">
                        <Slider 
                          defaultValue={[0, 500]} 
                          max={500} 
                          step={10}
                          value={priceRange}
                          onValueChange={setPriceRange} 
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">${priceRange[0]}</span>
                        <span className="text-sm">${priceRange[1]}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Location</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="All locations" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All locations</SelectItem>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="asia">Asia</SelectItem>
                            <SelectItem value="caribbean">Caribbean</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Rating</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Any rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Any rating</SelectItem>
                            <SelectItem value="4.5+">4.5+ stars</SelectItem>
                            <SelectItem value="4+">4+ stars</SelectItem>
                            <SelectItem value="3+">3+ stars</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button onClick={() => setShowFilters(false)} className="w-full bg-solana-gradient hover:opacity-90">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Results Count */}
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing {sortedHotels.length} {sortedHotels.length === 1 ? 'result' : 'results'}
                </p>
              </div>
              
              {/* Hotel Grid */}
              {sortedHotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedHotels.map((hotel) => (
                    <MintHotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setPriceRange([0, 500]);
                    }}
                  >
                    Reset all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;

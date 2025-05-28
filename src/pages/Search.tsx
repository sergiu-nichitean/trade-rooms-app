import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays, addYears, isBefore, isAfter } from "date-fns";
import { Calendar as CalendarIcon, Search as SearchIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { HotelListing } from "@/data/hotels";
import { searchHotels } from "@/lib/api";
import { toast } from "sonner";

const Search = () => {
  const [destination, setDestination] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  const navigate = useNavigate();

  // Date validation helpers
  const today = new Date();
  const maxDate = addYears(today, 1);
  const minStayDuration = 1; // minimum nights
  const maxTotalGuests = 8;
  const maxChildrenPerRoom = 2;

  const validateSearch = () => {
    // Destination validation
    if (!destination.trim()) {
      toast.error("Please enter a destination");
      return false;
    }

    if (destination.trim().length < 2) {
      toast.error("Destination must be at least 2 characters long");
      return false;
    }

    if (destination.trim().length > 100) {
      toast.error("Destination is too long");
      return false;
    }

    // Date validation
    if (!dateFrom) {
      toast.error("Please select check-in date");
      return false;
    }

    if (!dateTo) {
      toast.error("Please select check-out date");
      return false;
    }

    if (isBefore(dateFrom, today)) {
      toast.error("Check-in date cannot be in the past");
      return false;
    }

    if (isAfter(dateFrom, maxDate)) {
      toast.error("Check-in date cannot be more than 1 year in advance");
      return false;
    }

    if (dateTo < dateFrom) {
      toast.error("Check-out date cannot be earlier than check-in date");
      return false;
    }

    const nights = Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24));
    if (nights < minStayDuration) {
      toast.error(`Minimum stay duration is ${minStayDuration} night`);
      return false;
    }

    // Guest validation
    const totalGuests = adults + children;
    if (totalGuests > maxTotalGuests) {
      toast.error(`Maximum ${maxTotalGuests} guests allowed`);
      return false;
    }

    if (totalGuests > rooms * 4) {
      toast.error("Maximum 4 guests per room");
      return false;
    }

    if (adults < rooms) {
      toast.error("At least one adult required per room");
      return false;
    }

    if (children > rooms * maxChildrenPerRoom) {
      toast.error(`Maximum ${maxChildrenPerRoom} children per room`);
      return false;
    }

    return true;
  };

  const handleSearch = async () => {
    if (!validateSearch()) {
      return;
    }

    try {
      const searchResults = await searchHotels({
        location: destination,
        dateFrom,
        dateTo,
        rooms,
        adults,
        children
      });
      console.log('noResults', !searchResults || searchResults.length === 0);
      navigate('/search_results', { 
        state: { 
          searchResults: searchResults || [],
          searchParams: {
            destination,
            dateFrom,
            dateTo,
            rooms,
            adults,
            children
          },
          noResults: !searchResults || searchResults.length === 0
        }
      });
    } catch (error) {
      console.error('Error searching hotels:', error);
      toast.error("Failed to search hotels. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/10 to-background">
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-3xl space-y-6 mt-16">
              <h1 className="text-center text-3xl font-bold">Find your stay and own it</h1>
              {/* Search Input */}
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter a destination or property"
                  className="w-full h-14 pl-12 pr-4 text-lg rounded-xl"
                  maxLength={100}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date From */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-14 rounded-xl",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : <span>Check in</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                      disabled={(date) => isBefore(date, today) || isAfter(date, maxDate)}
                      fromDate={today}
                      toDate={maxDate}
                    />
                  </PopoverContent>
                </Popover>

                {/* Date To */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-14 rounded-xl",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : <span>Check out</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                      disabled={(date) => 
                        !dateFrom || 
                        isBefore(date, addDays(dateFrom, minStayDuration)) || 
                        isAfter(date, maxDate)
                      }
                      fromDate={dateFrom ? addDays(dateFrom, minStayDuration) : undefined}
                      toDate={maxDate}
                    />
                  </PopoverContent>
                </Popover>

                {/* Guests/Rooms Selector */}
                <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start font-normal h-14 rounded-xl"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      {`${rooms} Room · ${adults} Adults${children ? ` · ${children} Children` : ''}`}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="start">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Room</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setRooms(Math.max(1, rooms - 1))}
                            disabled={rooms <= 1}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{rooms}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setRooms(rooms + 1)}
                            disabled={adults + children >= maxTotalGuests}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Adults</p>
                          <p className="text-sm text-muted-foreground">Ages 18 or above</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setAdults(Math.max(rooms, adults - 1))}
                            disabled={adults <= rooms}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{adults}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setAdults(adults + 1)}
                            disabled={adults + children >= maxTotalGuests}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Children</p>
                          <p className="text-sm text-muted-foreground">Ages 0-17</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            disabled={children <= 0}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{children}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setChildren(children + 1)}
                            disabled={children >= rooms * maxChildrenPerRoom || adults + children >= maxTotalGuests}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-solana-gradient hover:opacity-90"
                        onClick={() => setIsGuestsOpen(false)}
                      >
                        Done
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <Button 
                className="w-full h-14 text-lg bg-solana-gradient hover:opacity-90 rounded-xl"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search; 
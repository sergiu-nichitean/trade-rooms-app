import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search as SearchIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const Redeem = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/10 to-background">
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-3xl space-y-6 mt-16 text-center">
              <h1 className="text-center text-3xl font-bold mb-8">Redeem Tokenized Hotel Stays</h1>
              Please log in with your wallet using the button in the top-right.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Redeem;
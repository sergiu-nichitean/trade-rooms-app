import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Button } from "@/components/ui/button";
import { Bed, LogIn } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const Navbar = () => {
  const { publicKey } = useWallet();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-md bg-solana-gradient p-1.5">
              <Bed className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">TradeRooms</span>
          </Link>
        </div>
        
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <HashLink to="/#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How it Works
          </HashLink>
          <Link to="/search" className="text-sm font-medium hover:text-primary transition-colors">
            Search
          </Link>
          <Link to="/redeem" className="text-sm font-medium hover:text-primary transition-colors">
            Redeem
          </Link>
          <HashLink to="/#team" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </HashLink>
          <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
            Blog
          </Link>
          <HashLink to="/#faq" className="text-sm font-medium hover:text-primary transition-colors">
            FAQ
          </HashLink>
        </nav>

        {/* Hamburger and mobile nav */}
        <div className="flex items-center gap-4">
          {/* Mobile menu - only show on small screens */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 px-6 py-5 border-b">
                  <div className="rounded-md bg-solana-gradient p-1.5">
                    <Bed className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-lg tracking-tight">Trade Rooms</span>
                </div>
                <nav className="flex flex-col gap-2 p-6">
                  <HashLink to="/#how-it-works" className="py-2 px-1 text-base font-medium hover:text-primary transition-colors">
                    How it Works
                  </HashLink>
                  <HashLink to="/#hotel-offers" className="py-2 px-1 text-base font-medium hover:text-primary transition-colors">
                    Hotel Offers
                  </HashLink>
                  <HashLink to="/#benefits" className="py-2 px-1 text-base font-medium hover:text-primary transition-colors">
                    Benefits
                  </HashLink>
                  <HashLink to="/#team" className="py-2 px-1 text-base font-medium hover:text-primary transition-colors">
                    About
                  </HashLink>
                  <Link to="/blog" className="py-2 px-1 text-base font-medium hover:text-primary transition-colors">
                    Blog
                  </Link>
                  <HashLink to="/#faq" className="py-2 px-1 text-base font-medium hover:text-primary transition-colors">
                    FAQ
                  </HashLink>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-4">
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Button } from "@/components/ui/button";
import { Bed, LogIn, Search, LayoutDashboard, Store, HelpCircle, BookOpen, Info } from "lucide-react";
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
          <Link to="/search" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
            <Search className="h-4 w-4" />
            Search
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <HashLink to="/#how-it-works" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
            <HelpCircle className="h-4 w-4" />
            How It Works
          </HashLink>
          <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            Blog
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
            <Info className="h-4 w-4" />
            About
          </Link>
        </nav>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/search" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <Search className="h-4 w-4" />
                Search
              </Link>
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link to="/how-it-works" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <HelpCircle className="h-4 w-4" />
                How It Works
              </Link>
              <Link to="/blog" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <BookOpen className="h-4 w-4" />
                Blog
              </Link>
              <Link to="/about" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <Info className="h-4 w-4" />
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-4">
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;



import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Bed, X, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-md bg-solana-gradient p-1.5">
                <Bed className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">Trade Rooms</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Book, sell, and transfer hotel stays securely on the Solana blockchain.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><HashLink to="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">How It Works</HashLink></li>
              <li><HashLink to="/#hotel-offers" className="text-sm text-muted-foreground hover:text-foreground">Hotel Offers</HashLink></li>
              <li><HashLink to="/#benefits" className="text-sm text-muted-foreground hover:text-foreground">Benefits</HashLink></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><HashLink to="/#team" className="text-sm text-muted-foreground hover:text-foreground">About</HashLink></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><HashLink to="/#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</HashLink></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Trade Rooms. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://x.com/traderoomsfun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

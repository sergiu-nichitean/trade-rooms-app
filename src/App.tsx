import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletContextProvider } from "@/contexts/WalletContext";
import '@solana/wallet-adapter-react-ui/styles.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchResults from "@/pages/SearchResults";
import MintHotel from "@/pages/MintHotel";
import Marketplace from "@/pages/Marketplace";
import NotFound from "@/pages/NotFound";
import Index from "./pages/Index";
import HotelDetail from "./pages/HotelDetail";
import Dashboard from "./pages/Dashboard";
import HowItWorks from "./pages/HowItWorks";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Redeem from "./pages/Redeem";
import BookingDetail from "@/pages/BookingDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WalletContextProvider>
        <WalletModalProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/search_results" element={<SearchResults />} />
                  <Route path="/hotel/:id" element={<HotelDetail />} />
                  <Route path="/mint_hotel/:id" element={<MintHotel />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/" element={<Index />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/redeem" element={<Redeem />} />
                  <Route path="/booking/:bookingId" element={<BookingDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </WalletModalProvider>
      </WalletContextProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

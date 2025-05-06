import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, CreditCard, HandCoins, Hotel, RefreshCw, ShieldCheck, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="bg-muted/50 py-10">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">How StaySol Works</h1>
            <p className="text-muted-foreground">
              Learn about our revolutionary approach to hotel bookings on the Solana blockchain
            </p>
          </div>
        </div>
        
        {/* Steps Section */}
        <div className="container py-16">
          <div className="max-w-3xl mx-auto space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8">
              <div className="flex justify-center md:justify-end">
                <div className="w-16 h-16 rounded-full bg-solana-gradient flex items-center justify-center text-white font-bold text-2xl">
                  1
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Browse & Purchase Tokens</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Browse our marketplace of exclusive hotel stays and purchase tokens at below-market rates. Each token represents a guaranteed night at a specific hotel.
                </p>
                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Exclusive Discounts</h3>
                      <p className="text-muted-foreground">
                        Our tokens are typically priced 15-40% below market rates, thanks to our bulk purchasing power and direct partnerships with premier hotels.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8">
              <div className="flex justify-center md:justify-end">
                <div className="w-16 h-16 rounded-full bg-solana-gradient flex items-center justify-center text-white font-bold text-2xl">
                  2
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Own Your Booking on the Blockchain</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Each token is securely recorded on the Solana blockchain, giving you true ownership of your hotel reservation with immutable proof of purchase.
                </p>
                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-secondary/10 p-3">
                      <ShieldCheck className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Blockchain Security</h3>
                      <p className="text-muted-foreground">
                        Solana blockchain technology ensures your reservation is secure, transparent, and resistant to tampering or overbooking. Your booking is guaranteed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8">
              <div className="flex justify-center md:justify-end">
                <div className="w-16 h-16 rounded-full bg-solana-gradient flex items-center justify-center text-white font-bold text-2xl">
                  3
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Complete Flexibility</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Change plans? No problem. You can sell your token on our marketplace, transfer it to someone else, or redeem it for your hotel stay within the valid period.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-card p-6 rounded-lg border">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-accent/10 p-3">
                        <RefreshCw className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Sell Anytime</h3>
                        <p className="text-muted-foreground text-sm">
                          List your token on our marketplace if your plans change.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg border">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Hotel className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Redeem</h3>
                        <p className="text-muted-foreground text-sm">
                          Use your token for your guaranteed hotel stay.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* User Types Section */}
        <div className="bg-muted/50 py-16">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Who StaySol Is For</h2>
              <p className="text-lg text-muted-foreground">
                Our platform serves different types of users, each with unique benefits
              </p>
            </div>
            
            <Tabs defaultValue="travelers" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="travelers">Travelers</TabsTrigger>
                <TabsTrigger value="investors">Investors</TabsTrigger>
                <TabsTrigger value="businesses">Businesses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="travelers" className="mt-6">
                <div className="bg-card rounded-lg border p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 flex justify-center">
                      <div className="rounded-full bg-primary/10 p-6 h-min">
                        <CalendarDays className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold mb-4">For Travelers</h3>
                      <p className="text-muted-foreground mb-6">
                        Secure the best hotel rates and maintain complete flexibility with your travel plans. No more cancellation fees or rigid booking windows.
                      </p>
                      
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-500 p-1 mt-1">
                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Lock in Low Rates</h4>
                            <p className="text-sm text-muted-foreground">
                              Purchase tokens when prices are low and use them when prices are high.
                            </p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-500 p-1 mt-1">
                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">No Cancellation Fees</h4>
                            <p className="text-sm text-muted-foreground">
                              If plans change, sell your token or transfer it instead of losing money.
                            </p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-500 p-1 mt-1">
                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Guaranteed Reservations</h4>
                            <p className="text-sm text-muted-foreground">
                              Your booking is secured on the blockchain and cannot be overbooked or changed.
                            </p>
                          </div>
                        </li>
                      </ul>
                      
                      <Button asChild className="mt-8 bg-solana-gradient hover:opacity-90">
                        <Link to="/marketplace">Browse Travel Deals <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="investors" className="mt-6">
                <div className="bg-card rounded-lg border p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 flex justify-center">
                      <div className="rounded-full bg-secondary/10 p-6 h-min">
                        <HandCoins className="h-10 w-10 text-secondary" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold mb-4">For Investors</h3>
                      <p className="text-muted-foreground mb-6">
                        Diversify your portfolio with tangible hotel assets that can appreciate in value, especially during high-demand seasons.
                      </p>
                      
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-500 p-1 mt-1">
                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Potential Appreciation</h4>
                            <p className="text-sm text-muted-foreground">
                              Hotel rates often increase during peak seasons, potentially increasing your token's value.
                            </p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-500 p-1 mt-1">
                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Tangible Assets</h4>
                            <p className="text-sm text-muted-foreground">
                              Unlike purely speculative tokens, each StaySol token represents a real-world service.
                            </p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-500 p-1 mt-1">
                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Liquid Market</h4>
                            <p className="text-sm text-muted-foreground">
                              Buy and sell tokens easily through our marketplace with minimal transaction fees.
                            </p>
                          </div>
                        </li>
                      </ul>
                      
                      <Button asChild className="mt-8 bg-solana-gradient hover:opacity-90">
                        <Link to="/marketplace">Start Investing <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="businesses" className="mt-6">
                <div className="bg-card rounded-lg border p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 flex justify-center">
                      <div className="rounded-full bg-accent/10 p-6 h-min">
                        <Wallet className="h-10 w-10 text-accent" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold mb-4">For Businesses</h3>
                      <p className="text-muted-foreground mb-6">
                        Manage your corporate travel budget more effectively by purchasing hotel tokens in bulk at discounted rates.
                      </p>
                      
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-500 p-1 mt-1">
                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Budget Predictability</h4>
                            <p className="text-sm text-muted-foreground">
                              Lock in travel costs at the beginning of the fiscal year, protecting against price increases.
                            </p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-500 p-1 mt-1">
                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Transferable Between Employees</h4>
                            <p className="text-sm text-muted-foreground">
                              Easily reassign hotel bookings to different team members as travel needs change.
                            </p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-500 p-1 mt-1">
                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Bulk Discounts</h4>
                            <p className="text-sm text-muted-foreground">
                              Special rates available for businesses purchasing multiple tokens at once.
                            </p>
                          </div>
                        </li>
                      </ul>
                      
                      <Button asChild className="mt-8 bg-solana-gradient hover:opacity-90">
                        <Link to="/contact">Contact for Business Rates <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="container py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Get answers to common questions about our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold text-lg mb-2">What happens if the hotel is fully booked?</h3>
              <p className="text-muted-foreground">
                Your token guarantees a room. We work directly with hotels to ensure that token holders always have availability, even during peak periods.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold text-lg mb-2">Can I sell my token if prices go up?</h3>
              <p className="text-muted-foreground">
                Yes! One of the key benefits of our platform is that you can sell your token on our marketplace if hotel rates increase or your plans change.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold text-lg mb-2">How do I redeem my token for a stay?</h3>
              <p className="text-muted-foreground">
                Simply visit your dashboard, select the token you wish to redeem, and choose your dates. We'll confirm your booking directly with the hotel.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold text-lg mb-2">Are there any additional fees?</h3>
              <p className="text-muted-foreground">
                No. The price you see is the price you pay. There are no hidden fees, resort fees, or additional charges when you redeem your token.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold text-lg mb-2">What if the hotel goes out of business?</h3>
              <p className="text-muted-foreground">
                We carefully select only established, reputable hotels. In the unlikely event of a closure, we offer equivalent or better alternative accommodations.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold text-lg mb-2">Do I need cryptocurrency to use StaySol?</h3>
              <p className="text-muted-foreground">
                While our platform leverages blockchain technology, you can purchase tokens using traditional payment methods like credit cards.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Have more questions? We're here to help.
            </p>
            <Button asChild variant="outline">
              <Link to="/faq">View All FAQs</Link>
            </Button>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-card border-y">
          <div className="container py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future of Hotel Bookings?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of smart travelers already saving money and gaining flexibility with StaySol.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-solana-gradient hover:opacity-90">
                  <Link to="/search">Search for Hotels</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;

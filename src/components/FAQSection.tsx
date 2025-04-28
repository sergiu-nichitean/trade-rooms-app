
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I buy tokenized room nights?",
      answer: "You'll be able to purchase directly on our platform using credit card, crypto, or other supported payment methods."
    },
    {
      question: "What if my travel dates change?",
      answer: "Simply resell the tokens in our marketplace or use them on different dates if flexible tokens are available."
    },
    {
      question: "Are these tokens secure and legal?",
      answer: "We partner with licensed entities and follow regulatory guidelines to ensure transparency and security for all participants."
    },
    {
      question: "Which hotels are involved?",
      answer: "Initially, we're partnering with boutique and independent hotels in select cities. As we grow, we'll add more locations and major brands."
    },
    {
      question: "Do I need to know blockchain tech to use this?",
      answer: "Not at all. We handle the technical side so you can buy, sell, and redeem tokens just like regular bookings — no prior crypto experience needed."
    },
    {
      question: "When is the platform going to be available?",
      answer: "We are actively working on the development as part of the Colosseum hackathon. We will launch a beta version in June 2025 for limited number of users. Register now for early access."
    }
  ];

  return (
    <section className="bg-muted/50 py-16">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about TradeRooms.Fun
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card border px-6 rounded-lg">
                <AccordionTrigger className="text-left text-lg font-medium py-4">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;



export interface HotelListing {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  tokenPrice: number;
  rating: number;
  imageUrl: string;
  amenities: string[];
  availableDates: {
    start: string;
    end: string;
  }[];
  tokenSupply: number;
  tokensSold: number;
  discount: number;
}

export const hotels: HotelListing[] = [
  {
    id: "1",
    name: "Skyline Heights Resort",
    location: "Miami, Florida",
    description: "Experience luxury at its finest with panoramic ocean views and exclusive access to private beaches. This premium resort offers a perfect blend of relaxation and adventure.",
    price: 299,
    tokenPrice: 249,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    amenities: ["Ocean View", "Private Pool", "Spa", "5-Star Restaurant", "Beach Access"],
    availableDates: [
      { 
        start: "2025-05-01",
        end: "2025-05-10"
      },
      { 
        start: "2025-06-15",
        end: "2025-06-25"
      }
    ],
    tokenSupply: 100,
    tokensSold: 72,
    discount: 17
  },
  {
    id: "2",
    name: "Alpine Retreat Lodge",
    location: "Aspen, Colorado",
    description: "Nestled in the heart of the mountains, this ski-in/ski-out lodge offers unparalleled access to pristine slopes and breathtaking mountain vistas all year round.",
    price: 399,
    tokenPrice: 319,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    amenities: ["Mountain View", "Ski-in/Ski-out", "Fireplace", "Hot Tub", "Gourmet Kitchen"],
    availableDates: [
      { 
        start: "2025-01-05",
        end: "2025-01-12"
      },
      { 
        start: "2025-02-10",
        end: "2025-02-17"
      }
    ],
    tokenSupply: 50,
    tokensSold: 38,
    discount: 20
  },
  {
    id: "3",
    name: "Desert Oasis Resort",
    location: "Scottsdale, Arizona",
    description: "Surrounded by stunning desert landscapes, this resort offers a peaceful retreat with world-class golf courses, rejuvenating spa treatments, and spectacular sunsets.",
    price: 249,
    tokenPrice: 199,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
    amenities: ["Desert View", "Golf Course", "Infinity Pool", "Spa", "Fitness Center"],
    availableDates: [
      { 
        start: "2025-03-20",
        end: "2025-03-27"
      },
      { 
        start: "2025-04-10",
        end: "2025-04-17"
      }
    ],
    tokenSupply: 75,
    tokensSold: 42,
    discount: 20
  },
  {
    id: "4",
    name: "Urban Luxe Hotel",
    location: "New York, New York",
    description: "Located in the heart of Manhattan, this boutique hotel offers sophisticated accommodations with easy access to iconic attractions, world-class dining, and vibrant nightlife.",
    price: 349,
    tokenPrice: 299,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    amenities: ["City View", "Rooftop Bar", "Concierge", "Fitness Center", "Gourmet Restaurant"],
    availableDates: [
      { 
        start: "2025-05-15",
        end: "2025-05-22"
      },
      { 
        start: "2025-07-10",
        end: "2025-07-17"
      }
    ],
    tokenSupply: 60,
    tokensSold: 29,
    discount: 14
  },
  {
    id: "5",
    name: "Tropical Paradise Resort",
    location: "Maui, Hawaii",
    description: "Immerse yourself in the beauty of Hawaii at this beachfront paradise offering authentic island experiences, lush tropical gardens, and world-class water activities.",
    price: 459,
    tokenPrice: 379,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    amenities: ["Ocean View", "Private Beach", "Infinity Pool", "Water Sports", "Cultural Activities"],
    availableDates: [
      { 
        start: "2025-02-10",
        end: "2025-02-17"
      },
      { 
        start: "2025-06-05",
        end: "2025-06-12"
      }
    ],
    tokenSupply: 40,
    tokensSold: 35,
    discount: 17
  },
  {
    id: "6",
    name: "Historic Château Hotel",
    location: "Loire Valley, France",
    description: "Step back in time at this meticulously restored château offering old-world charm, surrounded by vineyards and featuring exquisite French cuisine and wine tasting experiences.",
    price: 499,
    tokenPrice: 429,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    amenities: ["Vineyard View", "Wine Cellar", "French Gardens", "Gourmet Dining", "Bicycle Tours"],
    availableDates: [
      { 
        start: "2025-04-15",
        end: "2025-04-22"
      },
      { 
        start: "2025-09-10",
        end: "2025-09-17"
      }
    ],
    tokenSupply: 30,
    tokensSold: 18,
    discount: 14
  },
  {
    id: "7",
    name: "Mowbray Court Hotel",
    location: "London, United Kingdom",
    description: "A charming Victorian building just a 3-min walk from Earls Court Underground Station. With easy access to explore the vibrant city, enjoy the exclusive facilities and nearby attractions for two travelers.",
    price: 132,
    tokenPrice: 132,
    rating: 4.8,
    imageUrl: "https://s3.us-east-1.amazonaws.com/radius.art/traderooms/Mowbray+Court+Hotel.webp",
    amenities: ["Vineyard View", "Wine Cellar", "French Gardens", "Gourmet Dining", "Bicycle Tours"],
    availableDates: [
      { 
        start: "2025-04-15",
        end: "2025-04-22"
      },
      { 
        start: "2025-09-10",
        end: "2025-09-17"
      }
    ],
    tokenSupply: 30,
    tokensSold: 18,
    discount: 14
  },
  {
    id: "8",
    name: "HOTEL RIU PLAZA LONDON VICTORIA",
    location: "London, United Kingdom",
    description: "Located in vibrant Westminster, London, HOTEL RIU PLAZA LONDON VICTORIA is the perfect base for two travelers exploring iconic landmarks like Big Ben and Buckingham Palace.",
    price: 268,
    tokenPrice: 268,
    rating: 4.8,
    imageUrl: "https://s3.us-east-1.amazonaws.com/radius.art/traderooms/HOTEL+RIU+PLAZA+LONDON+VICTORIA.jpg",
    amenities: ["Ocean View", "Private Pool", "Spa", "5-Star Restaurant", "Beach Access"],
    availableDates: [
      { 
        start: "2025-05-01",
        end: "2025-05-10"
      },
      { 
        start: "2025-06-15",
        end: "2025-06-25"
      }
    ],
    tokenSupply: 100,
    tokensSold: 72,
    discount: 17
  },
  {
    id: "9",
    name: "Generator London",
    location: "London, United Kingdom",
    description: "Stay in style at Generator London, a former police station turned accommodation, perfect for two travelers seeking a memorable stay.",
    price: 150,
    tokenPrice: 150,
    rating: 4.9,
    imageUrl: "https://s3.us-east-1.amazonaws.com/radius.art/traderooms/Generator+London.webp",
    amenities: ["Mountain View", "Ski-in/Ski-out", "Fireplace", "Hot Tub", "Gourmet Kitchen"],
    availableDates: [
      { 
        start: "2025-01-05",
        end: "2025-01-12"
      },
      { 
        start: "2025-02-10",
        end: "2025-02-17"
      }
    ],
    tokenSupply: 50,
    tokensSold: 38,
    discount: 20
  },
  {
    id: "10",
    name: "Maitrise Hotel Maida Vale London",
    location: "London, United Kingdom",
    description: "Stay at Maitrise Hotel Maida Vale, a stylish Victorian-era townhouse in trendy North Maida Vale. Perfect for two travelers seeking a unique stay in London.",
    price: 88,
    tokenPrice: 88,
    rating: 4.7,
    imageUrl: "https://s3.us-east-1.amazonaws.com/radius.art/traderooms/Maitrise+Hotel+Maida+Vale+London.webp",
    amenities: ["Desert View", "Golf Course", "Infinity Pool", "Spa", "Fitness Center"],
    availableDates: [
      { 
        start: "2025-03-20",
        end: "2025-03-27"
      },
      { 
        start: "2025-04-10",
        end: "2025-04-17"
      }
    ],
    tokenSupply: 75,
    tokensSold: 42,
    discount: 20
  },
  {
    id: "11",
    name: "The Westminster London",
    location: "London, United Kingdom",
    description: "Stay at The Westminster London, Curio Collection by Hilton in the heart of Westminster, London. Enjoy modern facilities, comfortable beds, and friendly staff.",
    price: 233,
    tokenPrice: 233,
    rating: 4.6,
    imageUrl: "https://s3.us-east-1.amazonaws.com/radius.art/traderooms/The+Westminster+London.webp",
    amenities: ["City View", "Rooftop Bar", "Concierge", "Fitness Center", "Gourmet Restaurant"],
    availableDates: [
      { 
        start: "2025-05-15",
        end: "2025-05-22"
      },
      { 
        start: "2025-07-10",
        end: "2025-07-17"
      }
    ],
    tokenSupply: 60,
    tokensSold: 29,
    discount: 14
  },
  {
    id: "12",
    name: "citizenM Tower of London",
    location: "London, United Kingdom",
    description: "Located in London's financial hub, citizenM Tower of London offers the perfect base for two travelers exploring the city.",
    price: 11,
    tokenPrice: 11,
    rating: 4.9,
    imageUrl: "https://s3.us-east-1.amazonaws.com/radius.art/traderooms/citizenM+Tower+of+London.webp",
    amenities: ["Ocean View", "Private Beach", "Infinity Pool", "Water Sports", "Cultural Activities"],
    availableDates: [
      { 
        start: "2025-02-10",
        end: "2025-02-17"
      },
      { 
        start: "2025-06-05",
        end: "2025-06-12"
      }
    ],
    tokenSupply: 40,
    tokensSold: 35,
    discount: 17
  }
];

export const getHotelById = (id: string): HotelListing | undefined => {
  return hotels.find(hotel => hotel.id === id);
};

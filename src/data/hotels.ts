export interface HotelListing {
    hotel_id: string;
    hotel_name: string;
    address: string;
    city_name: string;
    price: number;
    currency: string;
    room_id: string;
    room_name: string;
    rate_plan_id: string;
    board_code: string;
    is_instant_confirm: boolean;
}

export const hotels: HotelListing[] = [
  {
    "id": "1",
    "name": "Desert Oasis Resort #1",
    "location": "New York, New York",
    "description": "Enjoy authentic cultural experiences and world-class dining.",
    "price": 566,
    "tokenPrice": 470,
    "rating": 4.7,
    "imageUrl": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80",
    "amenities": [
      "5-Star Restaurant",
      "Bicycle Tours",
      "Beach Access",
      "Golf Course",
      "Ocean View"
    ],
    "availableDates": [
      {
        "start": "2025-07-03",
        "end": "2025-07-13"
      },
      {
        "start": "2025-03-17",
        "end": "2025-03-25"
      }
    ],
    "tokenSupply": 100,
    "tokensSold": 91,
    "discount": 17
  },
  {
    "id": "2",
    "name": "Maitrise Hotel Maida Vale London #2",
    "location": "London, United Kingdom",
    "description": "Enjoy authentic cultural experiences and world-class dining.",
    "price": 203,
    "tokenPrice": 156,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Golf Course",
      "5-Star Restaurant",
      "Beach Access",
      "Spa",
      "Fitness Center"
    ],
    "availableDates": [
      {
        "start": "2025-06-09",
        "end": "2025-06-16"
      },
      {
        "start": "2025-07-12",
        "end": "2025-07-20"
      }
    ],
    "tokenSupply": 100,
    "tokensSold": 71,
    "discount": 23
  },
  {
    "id": "3",
    "name": "Tropical Paradise Resort #3",
    "location": "Singapore",
    "description": "Experience luxury at its finest with panoramic views and exclusive services.",
    "price": 273,
    "tokenPrice": 224,
    "rating": 4.7,
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Gourmet Dining",
      "Bicycle Tours",
      "Beach Access",
      "Rooftop Bar",
      "Ocean View"
    ],
    "availableDates": [
      {
        "start": "2025-02-24",
        "end": "2025-03-04"
      },
      {
        "start": "2025-08-23",
        "end": "2025-09-02"
      }
    ],
    "tokenSupply": 75,
    "tokensSold": 65,
    "discount": 18
  },
  {
    "id": "4",
    "name": "Alpine Retreat Lodge #4",
    "location": "Dubai, UAE",
    "description": "Immerse yourself in urban sophistication with access to top attractions.",
    "price": 145,
    "tokenPrice": 128,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Golf Course",
      "Mountain View",
      "Hot Tub",
      "Rooftop Bar",
      "Concierge"
    ],
    "availableDates": [
      {
        "start": "2025-06-15",
        "end": "2025-06-23"
      },
      {
        "start": "2025-05-09",
        "end": "2025-05-14"
      }
    ],
    "tokenSupply": 75,
    "tokensSold": 72,
    "discount": 12
  },
  {
    "id": "5",
    "name": "Skyline Heights Resort #5",
    "location": "Singapore",
    "description": "Experience luxury at its finest with panoramic views and exclusive services.",
    "price": 579,
    "tokenPrice": 446,
    "rating": 4.8,
    "imageUrl": "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
    "amenities": [
      "Rooftop Bar",
      "Private Pool",
      "Ocean View",
      "City View",
      "Spa"
    ],
    "availableDates": [
      {
        "start": "2025-10-02",
        "end": "2025-10-12"
      },
      {
        "start": "2025-07-09",
        "end": "2025-07-19"
      }
    ],
    "tokenSupply": 40,
    "tokensSold": 36,
    "discount": 23
  },
  {
    "id": "6",
    "name": "Desert Oasis Resort #6",
    "location": "New York, New York",
    "description": "Boutique charm meets modern comfort in this centrally located gem.",
    "price": 148,
    "tokenPrice": 117,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Fitness Center",
      "Concierge",
      "Golf Course",
      "5-Star Restaurant",
      "City View"
    ],
    "availableDates": [
      {
        "start": "2025-10-07",
        "end": "2025-10-16"
      },
      {
        "start": "2025-08-24",
        "end": "2025-08-30"
      }
    ],
    "tokenSupply": 60,
    "tokensSold": 56,
    "discount": 21
  },
  {
    "id": "7",
    "name": "Tropical Paradise Resort #7",
    "location": "Tokyo, Japan",
    "description": "Immerse yourself in urban sophistication with access to top attractions.",
    "price": 176,
    "tokenPrice": 153,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "City View",
      "Gourmet Dining",
      "Concierge",
      "Golf Course",
      "Rooftop Bar"
    ],
    "availableDates": [
      {
        "start": "2025-10-02",
        "end": "2025-10-08"
      },
      {
        "start": "2025-11-08",
        "end": "2025-11-15"
      }
    ],
    "tokenSupply": 60,
    "tokensSold": 45,
    "discount": 13
  },
  {
    "id": "8",
    "name": "Mowbray Court Hotel #8",
    "location": "Aspen, Colorado",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 404,
    "tokenPrice": 315,
    "rating": 4.8,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Golf Course",
      "City View",
      "Spa",
      "Fitness Center",
      "Gourmet Dining"
    ],
    "availableDates": [
      {
        "start": "2025-08-16",
        "end": "2025-08-22"
      },
      {
        "start": "2025-10-02",
        "end": "2025-10-09"
      }
    ],
    "tokenSupply": 75,
    "tokensSold": 14,
    "discount": 22
  },
  {
    "id": "9",
    "name": "Alpine Retreat Lodge #9",
    "location": "New York, New York",
    "description": "A peaceful retreat with spa services, nature trails, and stunning landscapes.",
    "price": 422,
    "tokenPrice": 346,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Mountain View",
      "Concierge",
      "Rooftop Bar",
      "5-Star Restaurant",
      "Hot Tub"
    ],
    "availableDates": [
      {
        "start": "2025-02-22",
        "end": "2025-02-27"
      },
      {
        "start": "2025-12-07",
        "end": "2025-12-13"
      }
    ],
    "tokenSupply": 30,
    "tokensSold": 18,
    "discount": 18
  },
  {
    "id": "10",
    "name": "Tropical Paradise Resort #10",
    "location": "Scottsdale, Arizona",
    "description": "Immerse yourself in urban sophistication with access to top attractions.",
    "price": 99,
    "tokenPrice": 77,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Bicycle Tours",
      "Private Pool",
      "Spa",
      "Mountain View",
      "Rooftop Bar"
    ],
    "availableDates": [
      {
        "start": "2025-09-17",
        "end": "2025-09-23"
      },
      {
        "start": "2025-10-03",
        "end": "2025-10-11"
      }
    ],
    "tokenSupply": 50,
    "tokensSold": 22,
    "discount": 22
  },
  {
    "id": "11",
    "name": "citizenM Tower of London #11",
    "location": "Aspen, Colorado",
    "description": "Boutique charm meets modern comfort in this centrally located gem.",
    "price": 474,
    "tokenPrice": 360,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Fireplace",
      "Fitness Center",
      "Private Pool",
      "Beach Access",
      "Hot Tub"
    ],
    "availableDates": [
      {
        "start": "2025-12-23",
        "end": "2025-12-29"
      },
      {
        "start": "2025-03-02",
        "end": "2025-03-07"
      }
    ],
    "tokenSupply": 50,
    "tokensSold": 26,
    "discount": 24
  },
  {
    "id": "12",
    "name": "Historic Ch\u00e2teau Hotel #12",
    "location": "New York, New York",
    "description": "Experience luxury at its finest with panoramic views and exclusive services.",
    "price": 183,
    "tokenPrice": 159,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Mountain View",
      "Beach Access",
      "5-Star Restaurant",
      "Concierge",
      "Hot Tub"
    ],
    "availableDates": [
      {
        "start": "2025-12-10",
        "end": "2025-12-18"
      },
      {
        "start": "2025-02-15",
        "end": "2025-02-20"
      }
    ],
    "tokenSupply": 30,
    "tokensSold": 15,
    "discount": 13
  },
  {
    "id": "13",
    "name": "Urban Luxe Hotel #13",
    "location": "Maui, Hawaii",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 578,
    "tokenPrice": 457,
    "rating": 4.5,
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Spa",
      "Ocean View",
      "Fireplace",
      "Private Pool",
      "Hot Tub"
    ],
    "availableDates": [
      {
        "start": "2025-01-10",
        "end": "2025-01-16"
      },
      {
        "start": "2025-08-06",
        "end": "2025-08-13"
      }
    ],
    "tokenSupply": 50,
    "tokensSold": 19,
    "discount": 21
  },
  {
    "id": "14",
    "name": "citizenM Tower of London #14",
    "location": "Tokyo, Japan",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 367,
    "tokenPrice": 286,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "5-Star Restaurant",
      "Fitness Center",
      "Bicycle Tours",
      "Beach Access",
      "Gourmet Dining"
    ],
    "availableDates": [
      {
        "start": "2025-10-17",
        "end": "2025-10-27"
      },
      {
        "start": "2025-10-09",
        "end": "2025-10-15"
      }
    ],
    "tokenSupply": 50,
    "tokensSold": 34,
    "discount": 22
  },
  {
    "id": "15",
    "name": "citizenM Tower of London #15",
    "location": "Dubai, UAE",
    "description": "Immerse yourself in urban sophistication with access to top attractions.",
    "price": 429,
    "tokenPrice": 347,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80",
    "amenities": [
      "Ocean View",
      "Gourmet Dining",
      "Spa",
      "Golf Course",
      "Concierge"
    ],
    "availableDates": [
      {
        "start": "2025-11-08",
        "end": "2025-11-14"
      },
      {
        "start": "2025-01-01",
        "end": "2025-01-09"
      }
    ],
    "tokenSupply": 60,
    "tokensSold": 19,
    "discount": 19
  },
  {
    "id": "16",
    "name": "HOTEL RIU PLAZA LONDON VICTORIA #16",
    "location": "London, United Kingdom",
    "description": "Immerse yourself in urban sophistication with access to top attractions.",
    "price": 82,
    "tokenPrice": 64,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "City View",
      "Ocean View",
      "Bicycle Tours",
      "Spa",
      "Concierge"
    ],
    "availableDates": [
      {
        "start": "2025-02-11",
        "end": "2025-02-16"
      },
      {
        "start": "2025-12-23",
        "end": "2025-12-30"
      }
    ],
    "tokenSupply": 40,
    "tokensSold": 16,
    "discount": 22
  },
  {
    "id": "17",
    "name": "HOTEL RIU PLAZA LONDON VICTORIA #17",
    "location": "Maui, Hawaii",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 174,
    "tokenPrice": 137,
    "rating": 4.8,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Beach Access",
      "Rooftop Bar",
      "Fireplace",
      "Spa",
      "Gourmet Dining"
    ],
    "availableDates": [
      {
        "start": "2025-01-23",
        "end": "2025-02-02"
      },
      {
        "start": "2025-07-12",
        "end": "2025-07-17"
      }
    ],
    "tokenSupply": 60,
    "tokensSold": 10,
    "discount": 21
  },
  {
    "id": "18",
    "name": "Maitrise Hotel Maida Vale London #18",
    "location": "Aspen, Colorado",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 532,
    "tokenPrice": 410,
    "rating": 4.8,
    "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Fitness Center",
      "5-Star Restaurant",
      "Ocean View",
      "Spa",
      "Hot Tub"
    ],
    "availableDates": [
      {
        "start": "2025-01-09",
        "end": "2025-01-14"
      },
      {
        "start": "2025-03-23",
        "end": "2025-03-31"
      }
    ],
    "tokenSupply": 100,
    "tokensSold": 89,
    "discount": 23
  },
  {
    "id": "19",
    "name": "The Westminster London #19",
    "location": "Aspen, Colorado",
    "description": "Enjoy authentic cultural experiences and world-class dining.",
    "price": 124,
    "tokenPrice": 103,
    "rating": 4.8,
    "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Concierge",
      "City View",
      "Bicycle Tours",
      "Spa",
      "Hot Tub"
    ],
    "availableDates": [
      {
        "start": "2025-03-01",
        "end": "2025-03-09"
      },
      {
        "start": "2025-10-05",
        "end": "2025-10-14"
      }
    ],
    "tokenSupply": 40,
    "tokensSold": 13,
    "discount": 17
  },
  {
    "id": "20",
    "name": "Mowbray Court Hotel #20",
    "location": "Dubai, UAE",
    "description": "Experience luxury at its finest with panoramic views and exclusive services.",
    "price": 84,
    "tokenPrice": 72,
    "rating": 4.8,
    "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Golf Course",
      "5-Star Restaurant",
      "Bicycle Tours",
      "Gourmet Dining",
      "Private Pool"
    ],
    "availableDates": [
      {
        "start": "2025-02-21",
        "end": "2025-02-28"
      },
      {
        "start": "2025-10-15",
        "end": "2025-10-21"
      }
    ],
    "tokenSupply": 50,
    "tokensSold": 29,
    "discount": 14
  },
  {
    "id": "21",
    "name": "Tropical Paradise Resort #21",
    "location": "Singapore",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 340,
    "tokenPrice": 289,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Fireplace",
      "Fitness Center",
      "Ocean View",
      "Spa",
      "Private Pool"
    ],
    "availableDates": [
      {
        "start": "2025-06-16",
        "end": "2025-06-24"
      },
      {
        "start": "2025-03-21",
        "end": "2025-03-31"
      }
    ],
    "tokenSupply": 30,
    "tokensSold": 14,
    "discount": 15
  },
  {
    "id": "22",
    "name": "Skyline Heights Resort #22",
    "location": "Scottsdale, Arizona",
    "description": "Immerse yourself in urban sophistication with access to top attractions.",
    "price": 531,
    "tokenPrice": 409,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Mountain View",
      "Beach Access",
      "Private Pool",
      "Rooftop Bar",
      "City View"
    ],
    "availableDates": [
      {
        "start": "2025-09-09",
        "end": "2025-09-17"
      },
      {
        "start": "2025-01-14",
        "end": "2025-01-24"
      }
    ],
    "tokenSupply": 40,
    "tokensSold": 18,
    "discount": 23
  },
  {
    "id": "23",
    "name": "HOTEL RIU PLAZA LONDON VICTORIA #23",
    "location": "Miami, Florida",
    "description": "A peaceful retreat with spa services, nature trails, and stunning landscapes.",
    "price": 118,
    "tokenPrice": 98,
    "rating": 4.8,
    "imageUrl": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80",
    "amenities": [
      "Mountain View",
      "Beach Access",
      "Ocean View",
      "Spa",
      "Fitness Center"
    ],
    "availableDates": [
      {
        "start": "2025-10-16",
        "end": "2025-10-24"
      },
      {
        "start": "2025-04-21",
        "end": "2025-04-27"
      }
    ],
    "tokenSupply": 75,
    "tokensSold": 60,
    "discount": 17
  },
  {
    "id": "24",
    "name": "The Westminster London #24",
    "location": "Singapore",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 536,
    "tokenPrice": 434,
    "rating": 4.7,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Fitness Center",
      "City View",
      "Concierge",
      "Fireplace",
      "Mountain View"
    ],
    "availableDates": [
      {
        "start": "2025-10-19",
        "end": "2025-10-28"
      },
      {
        "start": "2025-11-13",
        "end": "2025-11-23"
      }
    ],
    "tokenSupply": 100,
    "tokensSold": 72,
    "discount": 19
  },
  {
    "id": "25",
    "name": "HOTEL RIU PLAZA LONDON VICTORIA #25",
    "location": "Tokyo, Japan",
    "description": "A peaceful retreat with spa services, nature trails, and stunning landscapes.",
    "price": 331,
    "tokenPrice": 295,
    "rating": 4.7,
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Golf Course",
      "Ocean View",
      "Fireplace",
      "Private Pool",
      "Mountain View"
    ],
    "availableDates": [
      {
        "start": "2025-03-02",
        "end": "2025-03-10"
      },
      {
        "start": "2025-03-21",
        "end": "2025-03-29"
      }
    ],
    "tokenSupply": 100,
    "tokensSold": 30,
    "discount": 11
  },
  {
    "id": "26",
    "name": "Historic Ch\u00e2teau Hotel #26",
    "location": "Barcelona, Spain",
    "description": "Experience luxury at its finest with panoramic views and exclusive services.",
    "price": 411,
    "tokenPrice": 337,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "City View",
      "Hot Tub",
      "Ocean View",
      "Mountain View",
      "Fireplace"
    ],
    "availableDates": [
      {
        "start": "2025-12-19",
        "end": "2025-12-25"
      },
      {
        "start": "2025-12-21",
        "end": "2025-12-29"
      }
    ],
    "tokenSupply": 50,
    "tokensSold": 15,
    "discount": 18
  },
  {
    "id": "27",
    "name": "The Westminster London #27",
    "location": "Tokyo, Japan",
    "description": "A peaceful retreat with spa services, nature trails, and stunning landscapes.",
    "price": 450,
    "tokenPrice": 360,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80",
    "amenities": [
      "Gourmet Dining",
      "Fireplace",
      "Private Pool",
      "City View",
      "Ocean View"
    ],
    "availableDates": [
      {
        "start": "2025-06-19",
        "end": "2025-06-25"
      },
      {
        "start": "2025-08-19",
        "end": "2025-08-27"
      }
    ],
    "tokenSupply": 100,
    "tokensSold": 81,
    "discount": 20
  },
  {
    "id": "28",
    "name": "The Westminster London #28",
    "location": "Loire Valley, France",
    "description": "A peaceful retreat with spa services, nature trails, and stunning landscapes.",
    "price": 136,
    "tokenPrice": 122,
    "rating": 4.8,
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Gourmet Dining",
      "Mountain View",
      "City View",
      "Ocean View",
      "Golf Course"
    ],
    "availableDates": [
      {
        "start": "2025-07-09",
        "end": "2025-07-16"
      },
      {
        "start": "2025-02-12",
        "end": "2025-02-22"
      }
    ],
    "tokenSupply": 60,
    "tokensSold": 36,
    "discount": 10
  },
  {
    "id": "29",
    "name": "Skyline Heights Resort #29",
    "location": "London, United Kingdom",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 545,
    "tokenPrice": 431,
    "rating": 5.0,
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Private Pool",
      "Hot Tub",
      "Fireplace",
      "Fitness Center",
      "Rooftop Bar"
    ],
    "availableDates": [
      {
        "start": "2025-08-23",
        "end": "2025-08-30"
      },
      {
        "start": "2025-02-14",
        "end": "2025-02-20"
      }
    ],
    "tokenSupply": 40,
    "tokensSold": 31,
    "discount": 21
  },
  {
    "id": "30",
    "name": "Skyline Heights Resort #30",
    "location": "Loire Valley, France",
    "description": "A peaceful retreat with spa services, nature trails, and stunning landscapes.",
    "price": 323,
    "tokenPrice": 271,
    "rating": 4.5,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Fireplace",
      "Hot Tub",
      "Concierge",
      "Bicycle Tours",
      "Gourmet Dining"
    ],
    "availableDates": [
      {
        "start": "2025-09-12",
        "end": "2025-09-22"
      },
      {
        "start": "2025-05-11",
        "end": "2025-05-20"
      }
    ],
    "tokenSupply": 75,
    "tokensSold": 23,
    "discount": 16
  },
  {
    "id": "31",
    "name": "Skyline Heights Resort #31",
    "location": "New York, New York",
    "description": "Immerse yourself in urban sophistication with access to top attractions.",
    "price": 304,
    "tokenPrice": 249,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Rooftop Bar",
      "Fitness Center",
      "Fireplace",
      "Beach Access",
      "Private Pool"
    ],
    "availableDates": [
      {
        "start": "2025-08-02",
        "end": "2025-08-10"
      },
      {
        "start": "2025-03-22",
        "end": "2025-03-31"
      }
    ],
    "tokenSupply": 100,
    "tokensSold": 54,
    "discount": 18
  },
  {
    "id": "32",
    "name": "Tropical Paradise Resort #32",
    "location": "Singapore",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 274,
    "tokenPrice": 241,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Bicycle Tours",
      "Golf Course",
      "Spa",
      "Hot Tub",
      "Fireplace"
    ],
    "availableDates": [
      {
        "start": "2025-03-21",
        "end": "2025-03-28"
      },
      {
        "start": "2025-09-12",
        "end": "2025-09-21"
      }
    ],
    "tokenSupply": 60,
    "tokensSold": 27,
    "discount": 12
  },
  {
    "id": "33",
    "name": "Historic Ch\u00e2teau Hotel #33",
    "location": "London, United Kingdom",
    "description": "Immerse yourself in urban sophistication with access to top attractions.",
    "price": 438,
    "tokenPrice": 333,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Private Pool",
      "Hot Tub",
      "Rooftop Bar",
      "Gourmet Dining",
      "Fitness Center"
    ],
    "availableDates": [
      {
        "start": "2025-03-20",
        "end": "2025-03-26"
      },
      {
        "start": "2025-04-15",
        "end": "2025-04-22"
      }
    ],
    "tokenSupply": 40,
    "tokensSold": 28,
    "discount": 24
  },
  {
    "id": "34",
    "name": "Generator London #34",
    "location": "Dubai, UAE",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 464,
    "tokenPrice": 380,
    "rating": 4.8,
    "imageUrl": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80",
    "amenities": [
      "5-Star Restaurant",
      "Golf Course",
      "Spa",
      "Fitness Center",
      "Rooftop Bar"
    ],
    "availableDates": [
      {
        "start": "2025-04-04",
        "end": "2025-04-14"
      },
      {
        "start": "2025-08-03",
        "end": "2025-08-11"
      }
    ],
    "tokenSupply": 50,
    "tokensSold": 13,
    "discount": 18
  },
  {
    "id": "35",
    "name": "citizenM Tower of London #35",
    "location": "New York, New York",
    "description": "Experience luxury at its finest with panoramic views and exclusive services.",
    "price": 548,
    "tokenPrice": 444,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Fitness Center",
      "Spa",
      "Golf Course",
      "Rooftop Bar",
      "5-Star Restaurant"
    ],
    "availableDates": [
      {
        "start": "2025-06-21",
        "end": "2025-06-27"
      },
      {
        "start": "2025-10-16",
        "end": "2025-10-25"
      }
    ],
    "tokenSupply": 50,
    "tokensSold": 44,
    "discount": 19
  },
  {
    "id": "36",
    "name": "Urban Luxe Hotel #36",
    "location": "Miami, Florida",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 546,
    "tokenPrice": 464,
    "rating": 4.7,
    "imageUrl": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80",
    "amenities": [
      "Fitness Center",
      "Bicycle Tours",
      "Spa",
      "Concierge",
      "Gourmet Dining"
    ],
    "availableDates": [
      {
        "start": "2025-06-20",
        "end": "2025-06-27"
      },
      {
        "start": "2025-08-12",
        "end": "2025-08-17"
      }
    ],
    "tokenSupply": 40,
    "tokensSold": 31,
    "discount": 15
  },
  {
    "id": "37",
    "name": "Generator London #37",
    "location": "London, United Kingdom",
    "description": "A peaceful retreat with spa services, nature trails, and stunning landscapes.",
    "price": 406,
    "tokenPrice": 321,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Bicycle Tours",
      "Fitness Center",
      "Concierge",
      "5-Star Restaurant",
      "Mountain View"
    ],
    "availableDates": [
      {
        "start": "2025-01-04",
        "end": "2025-01-09"
      },
      {
        "start": "2025-02-09",
        "end": "2025-02-14"
      }
    ],
    "tokenSupply": 100,
    "tokensSold": 88,
    "discount": 21
  },
  {
    "id": "38",
    "name": "citizenM Tower of London #38",
    "location": "Singapore",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 468,
    "tokenPrice": 412,
    "rating": 5.0,
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "City View",
      "Hot Tub",
      "Ocean View",
      "Private Pool",
      "Spa"
    ],
    "availableDates": [
      {
        "start": "2025-12-18",
        "end": "2025-12-27"
      },
      {
        "start": "2025-09-01",
        "end": "2025-09-08"
      }
    ],
    "tokenSupply": 75,
    "tokensSold": 65,
    "discount": 12
  },
  {
    "id": "39",
    "name": "Alpine Retreat Lodge #39",
    "location": "London, United Kingdom",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 203,
    "tokenPrice": 171,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "5-Star Restaurant",
      "Bicycle Tours",
      "Rooftop Bar",
      "Fitness Center",
      "Beach Access"
    ],
    "availableDates": [
      {
        "start": "2025-07-10",
        "end": "2025-07-20"
      },
      {
        "start": "2025-05-13",
        "end": "2025-05-19"
      }
    ],
    "tokenSupply": 60,
    "tokensSold": 22,
    "discount": 16
  },
  {
    "id": "40",
    "name": "Historic Ch\u00e2teau Hotel #40",
    "location": "New York, New York",
    "description": "Experience luxury at its finest with panoramic views and exclusive services.",
    "price": 429,
    "tokenPrice": 369,
    "rating": 4.7,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Beach Access",
      "Fitness Center",
      "Spa",
      "Rooftop Bar",
      "Golf Course"
    ],
    "availableDates": [
      {
        "start": "2025-04-22",
        "end": "2025-05-01"
      },
      {
        "start": "2025-08-20",
        "end": "2025-08-29"
      }
    ],
    "tokenSupply": 40,
    "tokensSold": 29,
    "discount": 14
  },
  {
    "id": "41",
    "name": "The Westminster London #41",
    "location": "Scottsdale, Arizona",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 264,
    "tokenPrice": 238,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Ocean View",
      "Rooftop Bar",
      "Spa",
      "Mountain View",
      "5-Star Restaurant"
    ],
    "availableDates": [
      {
        "start": "2025-02-15",
        "end": "2025-02-25"
      },
      {
        "start": "2025-10-10",
        "end": "2025-10-19"
      }
    ],
    "tokenSupply": 100,
    "tokensSold": 91,
    "discount": 10
  },
  {
    "id": "42",
    "name": "Maitrise Hotel Maida Vale London #42",
    "location": "New York, New York",
    "description": "Experience luxury at its finest with panoramic views and exclusive services.",
    "price": 534,
    "tokenPrice": 417,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Fireplace",
      "Concierge",
      "Gourmet Dining",
      "Hot Tub",
      "Mountain View"
    ],
    "availableDates": [
      {
        "start": "2025-04-05",
        "end": "2025-04-12"
      },
      {
        "start": "2025-09-21",
        "end": "2025-09-29"
      }
    ],
    "tokenSupply": 75,
    "tokensSold": 22,
    "discount": 22
  },
  {
    "id": "43",
    "name": "Desert Oasis Resort #43",
    "location": "Barcelona, Spain",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 501,
    "tokenPrice": 436,
    "rating": 4.8,
    "imageUrl": "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
    "amenities": [
      "Private Pool",
      "Concierge",
      "5-Star Restaurant",
      "Spa",
      "Fireplace"
    ],
    "availableDates": [
      {
        "start": "2025-08-16",
        "end": "2025-08-24"
      },
      {
        "start": "2025-03-23",
        "end": "2025-04-02"
      }
    ],
    "tokenSupply": 60,
    "tokensSold": 43,
    "discount": 13
  },
  {
    "id": "44",
    "name": "Skyline Heights Resort #44",
    "location": "Barcelona, Spain",
    "description": "Immerse yourself in urban sophistication with access to top attractions.",
    "price": 155,
    "tokenPrice": 135,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Beach Access",
      "Bicycle Tours",
      "Private Pool",
      "Fireplace",
      "Hot Tub"
    ],
    "availableDates": [
      {
        "start": "2025-03-05",
        "end": "2025-03-10"
      },
      {
        "start": "2025-01-09",
        "end": "2025-01-18"
      }
    ],
    "tokenSupply": 50,
    "tokensSold": 19,
    "discount": 13
  },
  {
    "id": "45",
    "name": "HOTEL RIU PLAZA LONDON VICTORIA #45",
    "location": "Scottsdale, Arizona",
    "description": "Boutique charm meets modern comfort in this centrally located gem.",
    "price": 249,
    "tokenPrice": 209,
    "rating": 4.5,
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Spa",
      "City View",
      "Fireplace",
      "Golf Course",
      "Hot Tub"
    ],
    "availableDates": [
      {
        "start": "2025-11-16",
        "end": "2025-11-26"
      },
      {
        "start": "2025-02-20",
        "end": "2025-03-01"
      }
    ],
    "tokenSupply": 30,
    "tokensSold": 15,
    "discount": 16
  },
  {
    "id": "46",
    "name": "Desert Oasis Resort #46",
    "location": "New York, New York",
    "description": "Experience luxury at its finest with panoramic views and exclusive services.",
    "price": 180,
    "tokenPrice": 140,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
    "amenities": [
      "Spa",
      "5-Star Restaurant",
      "Rooftop Bar",
      "Fitness Center",
      "Beach Access"
    ],
    "availableDates": [
      {
        "start": "2025-04-12",
        "end": "2025-04-20"
      },
      {
        "start": "2025-09-22",
        "end": "2025-10-01"
      }
    ],
    "tokenSupply": 60,
    "tokensSold": 37,
    "discount": 22
  },
  {
    "id": "47",
    "name": "Desert Oasis Resort #47",
    "location": "Maui, Hawaii",
    "description": "Immerse yourself in urban sophistication with access to top attractions.",
    "price": 101,
    "tokenPrice": 89,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1587377838877-35db65ce9917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "Rooftop Bar",
      "Fitness Center",
      "Fireplace",
      "Gourmet Dining",
      "Bicycle Tours"
    ],
    "availableDates": [
      {
        "start": "2025-04-01",
        "end": "2025-04-06"
      },
      {
        "start": "2025-12-10",
        "end": "2025-12-17"
      }
    ],
    "tokenSupply": 100,
    "tokensSold": 64,
    "discount": 12
  },
  {
    "id": "48",
    "name": "Historic Ch\u00e2teau Hotel #48",
    "location": "Aspen, Colorado",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 421,
    "tokenPrice": 328,
    "rating": 5.0,
    "imageUrl": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80",
    "amenities": [
      "City View",
      "Ocean View",
      "Fireplace",
      "Hot Tub",
      "Concierge"
    ],
    "availableDates": [
      {
        "start": "2025-08-24",
        "end": "2025-08-31"
      },
      {
        "start": "2025-01-11",
        "end": "2025-01-17"
      }
    ],
    "tokenSupply": 50,
    "tokensSold": 20,
    "discount": 22
  },
  {
    "id": "49",
    "name": "Maitrise Hotel Maida Vale London #49",
    "location": "Loire Valley, France",
    "description": "Nestled in the heart of nature, offering serene escapes and outdoor activities.",
    "price": 378,
    "tokenPrice": 291,
    "rating": 4.6,
    "imageUrl": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80",
    "amenities": [
      "Fireplace",
      "Spa",
      "Concierge",
      "Private Pool",
      "Bicycle Tours"
    ],
    "availableDates": [
      {
        "start": "2025-01-16",
        "end": "2025-01-26"
      },
      {
        "start": "2025-04-02",
        "end": "2025-04-07"
      }
    ],
    "tokenSupply": 50,
    "tokensSold": 18,
    "discount": 23
  },
  {
    "id": "50",
    "name": "HOTEL RIU PLAZA LONDON VICTORIA #50",
    "location": "Miami, Florida",
    "description": "Boutique charm meets modern comfort in this centrally located gem.",
    "price": 587,
    "tokenPrice": 522,
    "rating": 4.9,
    "imageUrl": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "amenities": [
      "City View",
      "Hot Tub",
      "Beach Access",
      "5-Star Restaurant",
      "Spa"
    ],
    "availableDates": [
      {
        "start": "2025-02-11",
        "end": "2025-02-19"
      },
      {
        "start": "2025-08-05",
        "end": "2025-08-15"
      }
    ],
    "tokenSupply": 100,
    "tokensSold": 38,
    "discount": 11
  }
];

/*
[
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
]; */

export const getHotelById = (id: string): HotelListing | undefined => {
  return hotels.find(hotel => hotel.id === id);
};

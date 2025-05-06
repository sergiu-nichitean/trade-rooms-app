# Trade Rooms App

A decentralized hotel booking platform built with React, TypeScript, and Solana blockchain integration.

## Features

- Hotel search and filtering
- Real-time room availability
- Token-based hotel room ownership
- Solana blockchain integration for secure transactions
- Responsive design for all devices

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Solana Web3.js
- Axios

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Solana wallet (e.g., Phantom)
- Python 3.8+ (for backend API)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://127.0.0.1:8000
VITE_SOLANA_RPC_URL=https://distinguished-fragrant-emerald.solana-mainnet.quiknode.pro/33a309dd8517f81615706b1f55b2bdb3641258cb/
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8081`

## API Integration

The app integrates with a REST API for hotel data. The API endpoints include:

### Hotel Details
```bash
GET /api/hotels/{hotel_id}/
Headers:
  - accept: application/json
  - Authorization: Token <your-token>
```

Example response:
```json
{
  "id": 4,
  "hotel_id": "LON001",
  "hotel_name": "London Bridge Hotel",
  "city_name": "London",
  "country_code": "GB",
  "address": "10 London Bridge St, London SE1 9SG",
  "telephone": "+44-20-7555-0123",
  "longitude": "-0.088097",
  "latitude": "51.504756",
  "star": 4,
  "images": [],
  "amenities": [],
  "room_types": [],
  "rooms": [
    {
      "id": 13,
      "room_id": "LON001_R001",
      "room_name": "Deluxe Double",
      "max_occupancy": 2,
      "room_size": 30,
      "window": 1,
      "remarks": "City view, King bed",
      "rate_plans": [
        {
          "id": 21,
          "rate_plan_id": "LON001_R001_RO",
          "board_code": "RO",
          "allotment": 5,
          "price": 150,
          "currency": "USD",
          "is_instant_confirm": true,
          "latest_change_time": null
        }
      ]
    }
  ]
}
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── data/          # Mock data and constants
└── types/         # TypeScript type definitions
```

## Key Features

### Hotel Search
- Location-based search
- Date selection
- Guest count and room type filtering
- Price range filtering
- Rating filtering

### Hotel Details
- Comprehensive hotel information
- Room availability and pricing
- Amenities and facilities
- Location and contact details

### Token Minting
- Solana blockchain integration
- USDC payment processing
- Token ownership verification
- Transaction history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@traderooms.com or join our Discord community.

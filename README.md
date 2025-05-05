# Trade Rooms App

A modern web application for booking and trading hotel stays using NFTs on the Solana blockchain.

## Features

- 🏨 Hotel Search and Booking
- 🎫 NFT Marketplace for Hotel Stays
- 💳 Secure Payment Processing
- 🔐 Wallet Integration
- 📱 Responsive Design
- 🎨 Modern UI with shadcn/ui

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── HotelCard.tsx    # Hotel listing card component
│   ├── Navbar.tsx       # Navigation bar
│   └── Footer.tsx       # Footer component
├── pages/               # Page components
│   ├── Home.tsx         # Landing page
│   ├── Marketplace.tsx  # NFT marketplace
│   ├── HotelDetail.tsx  # Hotel details page
│   ├── BookingDetail.tsx # Booking details page
│   ├── Search.tsx       # Search page
│   ├── SearchResults.tsx # Search results page
│   ├── Dashboard.tsx    # User dashboard
│   ├── HowItWorks.tsx   # How it works page
│   ├── Blog.tsx         # Blog listing
│   ├── BlogPost.tsx     # Individual blog post
│   ├── Signup.tsx       # Signup page
│   └── NotFound.tsx     # 404 page
├── data/                # Mock data and types
│   ├── hotels.ts        # Hotel data
│   └── blog.ts          # Blog data
├── contexts/            # React contexts
│   └── WalletContext.tsx # Wallet connection context
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Technologies Used

- ⚡ Vite - Next Generation Frontend Tooling
- ⚛️ React - A JavaScript library for building user interfaces
- 📘 TypeScript - JavaScript with syntax for types
- 🎨 Tailwind CSS - A utility-first CSS framework
- 🎭 shadcn/ui - Beautifully designed components
- 🔗 Solana Web3 - Solana blockchain integration
- 📱 React Router - Declarative routing for React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd trade-rooms-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SOLANA_RPC_URL=your_solana_rpc_url
VITE_MARKETPLACE_PROGRAM_ID=your_program_id
```

## Deployment

The application can be deployed to various platforms:

1. **Vercel** (Recommended)
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` to deploy

2. **Netlify**
   - Connect your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **GitHub Pages**
   - Run `npm run build`
   - Push the `dist` folder to the `gh-pages` branch

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# FinergyCloud - AI-Powered Renewable Energy Investment Platform

## Overview

FinergyCloud is a comprehensive full-stack renewable energy investment platform that leverages artificial intelligence, advanced analytics, and sustainable finance to democratize access to clean energy investments. The platform combines cutting-edge technology with financial modeling to provide AI-powered investment predictions, ESG scoring, and portfolio management for renewable energy projects.

## Features

- **AI-Powered Predictions**: XGBoost machine learning models with 94% accuracy for renewable energy project success prediction
- **ESG Scoring System**: Comprehensive Environmental, Social, and Governance assessment with project-specific templates
- **Multi-Currency Support**: Real-time currency conversion supporting NGN, GBP, and EUR
- **Portfolio Management**: Real-time analytics and performance tracking
- **Professional Dashboard**: Business-grade interface with comprehensive project management
- **Mobile-First Design**: Responsive interface optimized for mobile and desktop

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **TailwindCSS** for responsive styling
- **Wouter** for client-side routing
- **TanStack Query** for state management
- **shadcn/ui** components with Radix UI primitives

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **Drizzle ORM** for type-safe database operations
- **Session-based authentication**
- **RESTful API** design

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/finergycloud.git
cd finergycloud
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database URL and other configurations
```

4. Run database migrations:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/           # Utility functions
│   │   └── hooks/         # Custom React hooks
├── server/                 # Express backend
│   ├── auth.ts            # Authentication logic
│   ├── db.ts              # Database configuration
│   ├── routes.ts          # API routes
│   └── storage.ts         # Database operations
├── shared/                 # Shared types and utilities
│   ├── schema.ts          # Database schema
│   └── currency.ts        # Currency utilities
└── assets/                 # Static assets
```

## Key Features

### AI Prediction Engine
- Multi-factor analysis including grid stability, community engagement, and project specifications
- Real-time prediction API with confidence scoring
- Technical, financial, regulatory, environmental, and market risk analysis

### ESG Scoring System
- Project-specific ESG templates for different renewable energy types
- Impact tracking for CO2 reduction, energy generation, and community benefits
- Benchmarking against industry standards

### Multi-Currency Financial Modeling
- IRR Calculator supporting multiple currencies
- Real-time currency conversion
- Advanced financial modeling for renewable energy investments

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open database studio

### Database Schema

The application uses Drizzle ORM with PostgreSQL. Key tables include:
- `users` - User authentication and profiles
- `projects` - Renewable energy projects
- `predictions` - AI prediction results
- `esg_metrics` - ESG scoring data
- `market_insights` - Market analysis data

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [your-email@example.com](mailto:your-email@example.com)
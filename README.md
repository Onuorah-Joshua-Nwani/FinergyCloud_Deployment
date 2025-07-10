# FinergyCloud - Complete Energy Investment Platform

**Independently Developed by Onuorah Joshua Nwani**

A comprehensive renewable energy investment platform featuring both web and mobile applications, with AI-powered predictions, ESG scoring, and advanced portfolio management capabilities.

> **Complete Platform**: This repository contains the full FinergyCloud ecosystem - both web platform and mobile app in one unified codebase.

## 🌟 Platform Overview

FinergyCloud offers a complete ecosystem for renewable energy investment management:

- **Web Platform**: Full-featured desktop experience with advanced analytics
- **Mobile App**: Touch-optimized mobile interface with streamlined navigation  
- **Unified Backend**: Shared infrastructure powering both platforms
- **Cross-Platform Integration**: Seamless switching between web and mobile experiences

## 🚀 Key Features

### Core Investment Tools
- **AI-Powered Predictions**: XGBoost machine learning models with 94% accuracy
- **ESG Scoring**: Comprehensive Environmental, Social & Governance assessment
- **IRR Calculator**: Multi-currency financial modeling (NGN, GBP, EUR)
- **Portfolio Analytics**: Real-time performance tracking and risk assessment
- **Project Management**: Full CRUD operations for renewable energy projects

### Advanced Features
- **Market Insights**: Industry intelligence with trend analysis
- **Rewards System**: Gamification with sustainability points and achievements
- **Risk Heat Maps**: Visual risk assessment across portfolios
- **Voice Insights**: AI-powered commentary on portfolio performance
- **Currency Conversion**: Real-time exchange rates and formatting

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management
- **shadcn/ui** component library with Radix UI primitives
- **Tailwind CSS** for styling

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for type-safe database operations
- **PostgreSQL** for data persistence
- **Passport.js** for authentication
- **Stripe** for subscription payments (requires API keys)

### Key Dependencies
- **@neondatabase/serverless**: Cloud PostgreSQL connection
- **drizzle-orm & drizzle-kit**: Type-safe ORM and migrations
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **zod**: Runtime type validation
- **recharts**: Interactive data visualizations

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Environment variables (see below)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd finergy-cloud
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Database
DATABASE_URL=your_postgresql_connection_string

# Authentication
SESSION_SECRET=your_session_secret_key

# Stripe (optional, for subscription payments)
STRIPE_SECRET_KEY=sk_your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=pk_your_stripe_public_key
```

4. Set up the database:
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
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Backend Express application
│   ├── auth.ts            # Authentication logic
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database operations
│   └── db.ts              # Database connection
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema definitions
└── package.json
```

## Key Features

### Dashboard
- Overview of portfolio performance
- Key performance indicators (KPIs)
- Quick action buttons for common tasks
- Recent project summaries

### AI Model
- XGBoost-powered prediction engine
- Project success probability analysis
- IRR predictions with confidence intervals
- Risk level assessment

### ESG Scoring
- Environmental impact metrics
- Social responsibility indicators
- Governance quality assessment
- Peer comparison analysis

### Project Management
- Comprehensive project onboarding
- Multi-currency support
- Project type categorization (Solar, Wind, Hydro, Biomass, Geothermal)
- Risk assessment and financial analysis

### IRR Calculator
- Advanced financial modeling
- Cash flow analysis
- Multi-currency calculations
- Project type-specific benchmarking

### Market Insights
- Real-time market analysis
- Industry trend tracking
- Regulatory update monitoring
- Categorized insights system

### Subscription Management
- Three-tier pricing (Free, Basic, Premium)
- Stripe payment integration
- Feature-based access control
- Subscription status tracking

## Database Schema

The application uses PostgreSQL with the following main tables:

- **users**: User accounts and subscription information
- **projects**: Renewable energy project data
- **esg_metrics**: Environmental, Social, Governance scores
- **market_insights**: Industry analysis and trends
- **predictions**: AI-generated project predictions
- **sessions**: User session management

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run db:push`: Push database schema changes
- `npm run db:studio`: Open database management interface

### Environment Setup

The application supports both development and production environments:

- **Development**: Uses Vite dev server with hot module replacement
- **Production**: Serves static files through Express with compiled backend

## Deployment

The application is designed to be deployed on platforms that support:
- Node.js runtime
- PostgreSQL database
- Environment variable configuration
- Static file serving

Popular deployment options include:
- Vercel
- Railway
- Heroku
- DigitalOcean App Platform
- AWS Elastic Beanstalk

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌍 Social Media & Community

- **GitHub**: [Project Repository](https://github.com/onuorah-joshua-nwani/ojn-msp-1-finergycloud)
- **LinkedIn**: [FinergyCloud Company](https://www.linkedin.com/company/finergycloud)
- **YouTube**: [FinergyCloud Official](https://www.youtube.com/@FinergyCloud_official)
- **Facebook**: [Onuorah Joshua Nwani](https://www.facebook.com/onuorah.joshua.nwani)
- **Medium**: [Blog Articles](https://medium.com/@onuorahani)

## 📞 Support & Contact

- **Email**: onuorahani@gmail.com
- **Issues**: [GitHub Issues](https://github.com/onuorah-joshua-nwani/ojn-msp-1-finergycloud/issues)
- **LinkedIn**: [Professional Profile](https://www.linkedin.com/in/onuorah-joshua-nwani)

---

**FinergyCloud Platform** - Independently owned and operated renewable energy investment platform.
*Building the future of sustainable energy investment through innovative technology.*
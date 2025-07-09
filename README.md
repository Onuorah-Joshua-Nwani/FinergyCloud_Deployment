# FinergyCloud - Renewable Energy Investment Platform

A comprehensive renewable energy investment platform that provides intelligent project management, advanced financial analysis, and data-driven insights for sustainable investments.

> **Note**: This is the web platform component of FinergyCloud. The mobile app can be found in the `main` branch under the `mobile-app/` directory.

## Features

- **AI-Powered Analytics**: XGBoost machine learning models for project success predictions
- **ESG Scoring**: Comprehensive Environmental, Social, and Governance assessment
- **IRR Calculator**: Advanced financial modeling with multi-currency support
- **Portfolio Management**: Real-time project tracking and performance analytics
- **Market Insights**: Industry trends and regulatory updates
- **Risk Assessment**: Comprehensive risk analysis and mitigation strategies
- **Subscription Model**: Flexible pricing plans for different user needs

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

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in `replit.md` for detailed implementation notes

---

**FinergyCloud** - Powering the future of renewable energy investment analysis
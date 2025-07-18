# FinergyCloud - AI-Powered Renewable Energy Investment Platform

## Overview

FinergyCloud is a comprehensive full-stack renewable energy investment platform that leverages artificial intelligence, advanced analytics, and sustainable finance to democratize access to clean energy investments. The platform provides AI-powered project success predictions, ESG scoring, portfolio management, and real-time market insights for renewable energy investors in emerging markets.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Architecture
The application uses a modern full-stack TypeScript architecture with the following key components:
- **Frontend**: React 18+ with TypeScript, Vite build system, and Tailwind CSS
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build System**: Vite for client-side bundling, esbuild for server bundling
- **Deployment**: Railway platform with Docker containerization

### Frontend Architecture
- **React Application**: Single-page application using React 18+ with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and CSS variables
- **State Management**: TanStack React Query for server state, React hooks for local state
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Express Server**: RESTful API with TypeScript
- **Database Layer**: Drizzle ORM with PostgreSQL database
- **Session Management**: Express sessions with PostgreSQL store (fallback to memory store)
- **Authentication**: Simple session-based authentication with demo user auto-login
- **API Structure**: Organized route handlers with proper error handling and timeouts

## Key Components

### Database Schema
The application uses PostgreSQL with the following main entities:
- **Projects**: Renewable energy projects with capacity, IRR, ESG scores, and status
- **Predictions**: AI-generated project success predictions with confidence scores
- **ESG Metrics**: Environmental, social, and governance scoring data
- **Market Insights**: Market analysis and trends data
- **Users**: User accounts with subscription management
- **Rewards System**: Achievements, challenges, and user progress tracking

### AI/ML Features
- **XGBoost Prediction Engine**: 94% accuracy project success prediction
- **Risk Assessment**: Multi-factor risk analysis with confidence scoring
- **ESG Scoring**: Comprehensive environmental, social, and governance assessment
- **Portfolio Analytics**: Real-time performance tracking and optimization

### Multi-Platform Support
- **Website Mode**: Full-featured web platform for institutional users
- **Mobile App Mode**: Optimized mobile experience for on-the-go management
- **Platform Detection**: URL parameter-based platform switching
- **Responsive Design**: Mobile-first design with progressive enhancement

### Financial Features
- **Multi-Currency Support**: NGN, GBP, EUR with real-time conversion
- **IRR Calculator**: Internal rate of return calculations for project evaluation
- **Portfolio Management**: Real-time analytics and performance tracking
- **Investment Predictions**: AI-powered financial projections

## Data Flow

### Client-Server Communication
1. **API Requests**: Frontend makes HTTP requests to Express backend
2. **Authentication**: Session-based auth with automatic demo user login
3. **Data Fetching**: TanStack React Query manages server state and caching
4. **Real-time Updates**: Optimistic updates with proper error handling

### Database Operations
1. **Connection Management**: Neon PostgreSQL with connection pooling
2. **Schema Management**: Drizzle ORM with TypeScript-first approach
3. **Migrations**: Database schema versioning with drizzle-kit
4. **Query Optimization**: Efficient data fetching with proper indexing

### AI/ML Pipeline
1. **Input Processing**: Form data validation and preprocessing
2. **Model Execution**: XGBoost models for success probability prediction
3. **Result Generation**: Confidence scoring and risk assessment
4. **Output Formatting**: User-friendly prediction reports with visualizations

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL (serverless)
- **UI Components**: Radix UI ecosystem for accessible components
- **Validation**: Zod for runtime type checking and form validation
- **Authentication**: Express sessions with connect-pg-simple
- **Development**: Vite development server with HMR

### Payment Integration
- **Stripe**: Payment processing for subscription management
- **Currency APIs**: Real-time exchange rate data (simulated in demo)

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESLint/Prettier**: Code quality and formatting
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Production Deployment (Fixed Jan 2025)
- **Entry Point**: `start.js` - robust production entry point with multiple fallback strategies
- **Build Process**: `build.sh` script handles esbuild server compilation and frontend builds
- **Built Files**: Server compiled to `dist/index.js` (61.7kb optimized bundle)
- **Fallback Strategy**: Runs TypeScript source directly if built files unavailable
- **Environment**: Production Node.js with comprehensive error handling and logging
- **Health Checks**: API health endpoint for monitoring
- **Restart Policy**: Multiple startup strategies ensure deployment reliability

### Database Strategy
- **Primary**: PostgreSQL for production data
- **Fallbacks**: Memory storage for session management if database unavailable
- **Migrations**: Schema management with drizzle-kit push commands

### Asset Management
- **Static Assets**: Served through Vite build system
- **Images**: Optimized asset delivery with proper caching headers
- **PWA Features**: Service worker disabled to prevent caching issues during development

### Scalability Considerations
- **Session Storage**: PostgreSQL-backed sessions with memory fallback
- **Database Pooling**: Connection pooling for efficient resource usage
- **Error Handling**: Comprehensive error boundaries and timeout management
- **Performance**: Mobile optimization with lazy loading and progressive enhancement

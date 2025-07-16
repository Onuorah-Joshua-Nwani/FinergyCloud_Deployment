# FinergyCloud - AI-Powered Renewable Energy Investment Platform

## Overview

FinergyCloud is a comprehensive full-stack renewable energy investment platform that leverages artificial intelligence, advanced analytics, and sustainable finance to democratize access to clean energy investments. The application provides AI-powered predictions with 94% accuracy for renewable energy project success prediction, comprehensive ESG scoring, multi-currency support, and professional portfolio management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
The application follows a monorepo structure with clear separation between client, server, and shared code:
- `client/` - React frontend application
- `server/` - Node.js Express backend
- `shared/` - Shared TypeScript schemas and utilities

### Development and Build Strategy
- **Vite** for fast development and optimized frontend builds
- **esbuild** for backend bundling
- **TypeScript** throughout for type safety
- **ESM modules** for modern JavaScript support

## Key Components

### Frontend Architecture
- **React 18** with TypeScript for component-based UI
- **Vite** as the build tool for fast development and optimized production builds
- **TailwindCSS** for utility-first responsive styling
- **Wouter** for lightweight client-side routing (chosen over React Router for smaller bundle size)
- **TanStack Query** for server state management and caching
- **shadcn/ui** components built on Radix UI primitives for accessible, customizable UI components

**Rationale**: This frontend stack prioritizes developer experience, performance, and modern React patterns while keeping bundle sizes small for mobile optimization.

### Backend Architecture
- **Node.js** with Express.js for the REST API server
- **Session-based authentication** using express-session with PostgreSQL store fallback to memory store
- **RESTful API** design for clear separation of concerns
- **Request timeout middleware** (30-second timeout) for reliable responses

**Rationale**: Express.js provides flexibility and a mature ecosystem, while session-based auth offers simplicity for the MVP without requiring complex JWT token management.

### Mobile-First Design
- **Responsive design** optimized for mobile and desktop
- **Platform detection** via URL parameters (`?platform=mobile`)
- **Mobile-specific components** for touch-optimized interactions
- **Progressive Web App** capabilities with service worker support

**Rationale**: Given the target market of emerging economies, mobile-first design ensures accessibility across devices with varying capabilities.

## Data Flow

### Database Layer
- **PostgreSQL** as the primary database
- **Drizzle ORM** for type-safe database operations and migrations
- **Neon Database** serverless PostgreSQL for production deployment

**Schema Design**:
- `projects` - Core renewable energy project data
- `predictions` - AI model predictions and analysis results
- `esgMetrics` - Environmental, Social, Governance scoring data
- `marketInsights` - Market analysis and insights
- `users` - User authentication and profile data
- `achievements` and `userAchievements` - Gamification system

### State Management
- **TanStack Query** for server state, caching, and synchronization
- **React hooks** for local component state
- **Currency context** for global currency selection (NGN, GBP, EUR)

### AI/ML Integration
- **XGBoost models** for 94% accurate project success prediction
- **ESG scoring system** with project-specific templates
- **Risk assessment algorithms** for investment analysis

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless** - Serverless PostgreSQL connection
- **@radix-ui/** components - Accessible UI primitives
- **@stripe/stripe-js** and **@stripe/react-stripe-js** - Payment processing
- **bcrypt** - Password hashing for security
- **express-session** - Session management
- **drizzle-orm** - Type-safe database operations

### Development Dependencies
- **@replit/vite-plugin-cartographer** - Replit-specific development tools
- **@replit/vite-plugin-runtime-error-modal** - Enhanced error handling

### Multi-Currency Support
- Real-time currency conversion supporting NGN, GBP, and EUR
- Local currency storage and conversion utilities
- Exchange rate management system

**Rationale**: Multi-currency support is essential for international investors in emerging markets, with NGN as the base currency reflecting the Nigerian market focus.

## Deployment Strategy

### Production Environment
- **Railway** as the primary deployment platform (configured via `.railway.json`)
- **Docker** containerization for consistent deployments
- **Node.js production** environment with PM2-style restart policies

### Build Process
1. **Frontend**: Vite builds optimized static assets to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations handle schema updates

### Environment Configuration
- `NODE_ENV=production` for production optimizations
- `PORT=5000` for Railway deployment
- `DATABASE_URL` for PostgreSQL connection
- Session secrets and API keys via environment variables

### Performance Optimizations
- Static asset optimization through Vite
- Database connection pooling via Neon
- Session store optimization (PostgreSQL preferred, memory fallback)
- Request timeouts and error handling for reliability

**Rationale**: Railway provides a simple deployment solution for full-stack applications, while the build process ensures optimized production bundles and proper environment separation.

## Key Architectural Decisions

### Type Safety
- **Shared schemas** in `shared/schema.ts` using Drizzle and Zod for runtime validation
- **TypeScript paths** configured for clean imports (`@/`, `@shared/`)
- **Type-safe API** requests with proper error handling

### Error Handling and Resilience
- **Graceful degradation** for offline functionality
- **Timeout mechanisms** for API requests
- **Fallback strategies** for external service failures
- **Mobile error boundaries** for enhanced user experience

### Security Considerations
- **bcrypt** for password hashing
- **Session-based authentication** with secure cookie settings
- **CSRF protection** through session configuration
- **Input validation** using Zod schemas

This architecture provides a solid foundation for a scalable renewable energy investment platform while maintaining simplicity and developer productivity for rapid iteration and growth.
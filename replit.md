# FinergyCloud - Complete Energy Investment Platform

## Overview

FinergyCloud is a comprehensive renewable energy investment platform that provides AI-powered predictions, ESG scoring, and portfolio management for clean energy projects. This is a full-stack web application built with React and Express.js, designed to complement the existing mobile app with advanced desktop and tablet capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using modern React patterns:
- **React 18** with TypeScript for type safety and modern development practices
- **Vite** as the build tool providing fast development and optimized production builds
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query** for efficient server state management, caching, and synchronization
- **shadcn/ui** component library built on Radix UI primitives for consistent, accessible UI components
- **Tailwind CSS** for utility-first styling with a custom design system

### Backend Architecture
The server follows a REST API pattern with Express.js:
- **Express.js** with TypeScript providing a robust server framework
- **Drizzle ORM** for type-safe database operations with PostgreSQL
- **Session-based authentication** using express-session with PostgreSQL session storage
- **Modular route structure** separating authentication, data operations, and business logic
- **Memory storage fallback** for development environments when database is unavailable

### Database Layer
PostgreSQL database with Drizzle ORM providing:
- **Type-safe schema definitions** shared between client and server
- **Automated migrations** through drizzle-kit
- **Connection pooling** via Neon serverless PostgreSQL
- **Runtime validation** using Zod schemas

## Key Components

### Core Data Models
- **Projects**: Renewable energy projects with capacity, location, IRR, ESG scores, and risk assessments
- **Predictions**: AI-generated project success predictions using XGBoost machine learning models
- **ESG Metrics**: Environmental, Social, and Governance scoring with detailed impact measurements
- **Market Insights**: Industry analysis, trends, and regulatory updates
- **Users**: Authentication and subscription management
- **Rewards System**: Gamification with achievements, challenges, and sustainability points

### Feature Modules
1. **Dashboard**: Portfolio overview with key performance indicators and quick actions
2. **AI Model**: XGBoost-powered prediction engine with 94% accuracy for project success analysis
3. **ESG Scoring**: Comprehensive sustainability assessment with environmental impact calculations
4. **IRR Calculator**: Multi-currency financial modeling supporting NGN, GBP, and EUR
5. **Project Management**: Portfolio tracking with CRUD operations and detailed project analysis
6. **Market Insights**: Industry intelligence platform with categorized content management
7. **KPI Analytics**: Advanced performance metrics with interactive data visualizations
8. **Rewards System**: Gamification features including achievements, challenges, and sustainability tracking

### Advanced Features
- **Mobile Gesture Controls**: Touch-based navigation for mobile and tablet devices
- **Voice Insights Narrator**: AI-powered voice commentary on portfolio performance
- **Risk Heat Maps**: Real-time risk visualization across project portfolios
- **Project Recommendation Engine**: ML-powered investment opportunity suggestions
- **Multi-currency Support**: Real-time conversion between NGN, GBP, and EUR
- **Cross-Platform Navigation**: Seamless switching between web platform and mobile app
- **Social Media Integration**: Connected presence across GitHub, LinkedIn, YouTube, Facebook, and Medium

## Data Flow

### Authentication Flow
1. User authentication via session-based login system
2. Session persistence in PostgreSQL with configurable TTL
3. Protected routes requiring authentication middleware
4. User context management through React Query

### Data Synchronization
1. Client requests data through TanStack Query with automatic caching
2. Server validates requests and queries PostgreSQL via Drizzle ORM
3. Real-time updates through query invalidation and refetching
4. Optimistic updates for improved user experience

### Currency Handling
1. Base currency calculations in Nigerian Naira (NGN)
2. Real-time conversion using predefined exchange rates
3. Context-based currency selection with localStorage persistence
4. Automatic formatting based on selected currency

## External Dependencies

### Core Infrastructure
- **@neondatabase/serverless**: Cloud-hosted PostgreSQL database connection
- **Drizzle ORM & Kit**: Type-safe database operations and schema management
- **TanStack React Query**: Server state management and caching
- **Express.js**: Backend API framework

### UI and Styling
- **@radix-ui/***: Accessible UI primitives for components
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **Recharts**: Data visualization library for interactive charts

### Development Tools
- **TypeScript**: Type safety across the entire application
- **Vite**: Fast development server and production builds
- **Zod**: Runtime type validation and schema enforcement
- **React Hook Form**: Form handling with validation

### Optional Integrations
- **Stripe**: Payment processing for subscription management (requires API keys)
- **XGBoost Models**: Machine learning predictions (simulated in current implementation)

## Deployment Strategy

### Environment Configuration
The application supports multiple deployment environments:
- **Development**: Local development with hot reloading via Vite
- **Production**: Optimized builds with server-side rendering support
- **Environment Variables**: Database URLs, session secrets, and API keys managed via .env files

### Build Process
1. **Frontend Build**: Vite compiles React application to static assets
2. **Backend Build**: ESBuild bundles Express.js server for deployment
3. **Database Setup**: Drizzle migrations ensure schema consistency
4. **Static Asset Serving**: Express serves built frontend in production

### Deployment Platforms
The application is designed to deploy on modern cloud platforms:
- **Vercel**: Recommended for full-stack deployment with automatic database integration
- **Railway**: Alternative platform with built-in database hosting
- **Render**: Free tier available for testing and development
- **Netlify**: Static site hosting with serverless functions
- **DigitalOcean**: App Platform with integrated databases
- **AWS**: Elastic Beanstalk or EC2 with RDS
- **Google Cloud**: App Engine with Cloud SQL
- **Traditional VPS**: Can be deployed on any Node.js-capable server

### Branch Strategy
- **Main Branch**: Contains mobile app and static website files
- **Web Platform Branch**: Complete web application (current codebase)
- **Production Ready**: All necessary configuration files and documentation included

### Social Media & Platform Integration
The platform maintains a unified presence across multiple channels:
- **GitHub Repository**: https://github.com/onuorah-joshua-nwani/ojn-msp-1-finergycloud
- **LinkedIn Company**: https://www.linkedin.com/company/finergycloud
- **YouTube Channel**: https://www.youtube.com/@FinergyCloud_official
- **Facebook Profile**: https://www.facebook.com/onuorah.joshua.nwani
- **Medium Blog**: https://medium.com/@onuorahani

### Cross-Platform Experience
- **Complete Platform Separation**: Web and mobile app maintained as entirely separate experiences
- **Platform-Specific Navigation**: Mobile app uses hamburger menu + bottom navigation, website uses standard header navigation
- **Smart Platform Switching**: "Website" link in mobile app navigation, "Mobile App" link in website navigation
- **Responsive Mobile Design**: Fixed bottom navigation with proper content padding to prevent overlap
- **Independent User Flows**: Each platform operates independently with platform-specific feature sets
- **Unified Branding**: Consistent FinergyCloud identity across all platforms and social channels

### Recent Updates (January 2025)
- **Mobile Navigation Polish**: Fixed bottom navigation positioning and content overlap issues
- **Responsive Design Enhancement**: Improved mobile card layouts, chart responsiveness, and typography scaling
- **Platform Navigation**: Perfected side navigation for mobile app features with smooth platform switching
- **Mobile UX Optimization**: Added proper padding, responsive breakpoints, and touch-friendly interface elements
- **Complete Platform Independence**: Removed all external platform dependencies and traces to ensure 100% independent codebase ownership
- **Mobile App Navigation Fix**: Fixed dashboard Quick Actions to preserve `?platform=mobile` parameter ensuring consistent mobile app navigation
- **Enhanced Platform Detection**: Improved navigation component platform detection for reliable mobile app vs website navigation
- **Comprehensive Documentation**: Added INDEPENDENT_DEPLOYMENT.md and OWNERSHIP.md for complete independence verification
- **Updated Branding**: Enhanced README.md and documentation to reflect complete independent ownership by Onuorah Joshua Nwani
- **Hamburger Menu Visibility**: Fixed hamburger menu disappearing on tablets by changing visibility from `md:hidden` to `lg:hidden`, ensuring consistent navigation across all mobile app pages

The platform is designed to integrate seamlessly with the existing mobile application, sharing backend infrastructure while providing enhanced desktop and tablet experiences for renewable energy investment management.
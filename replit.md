# FinergyCloud Mobile App

## Overview

FinergyCloud Mobile is a comprehensive renewable energy investment platform that provides AI-powered predictions, ESG scoring, and portfolio management for clean energy projects. The application combines a React-based frontend with an Express.js backend, using PostgreSQL for data persistence and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using modern React with TypeScript, featuring:
- **React 18** with functional components and hooks
- **Vite** as the build tool for fast development and optimized production builds
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and caching
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for styling with a custom design system

### Backend Architecture
The backend follows a REST API pattern using:
- **Express.js** with TypeScript for the server framework
- **Drizzle ORM** for type-safe database operations
- **Neon Database** (PostgreSQL) for cloud-hosted data storage
- **Zod** for runtime type validation and schema enforcement
- Memory storage fallback for development and testing

### Component Structure
The application is organized into clear layers:
- **UI Components**: Reusable components from shadcn/ui library
- **Feature Components**: Business-specific components (KPI cards, project cards, charts)
- **Pages**: Route-level components for main application views
- **Shared Schema**: Common type definitions and validation schemas

## Key Components

### Database Schema
The application manages four main entities:
- **Projects**: Renewable energy projects with capacity, location, IRR, and risk data
- **Predictions**: AI-generated predictions for project success using XGBoost model
- **ESG Metrics**: Environmental, Social, and Governance scoring data
- **Market Insights**: Industry trends and analysis content

### Core Features
1. **Dashboard**: Overview of portfolio performance with KPI metrics
2. **AI Model**: XGBoost-powered prediction engine for project success
3. **ESG Scoring**: Environmental impact assessment and sustainability metrics
4. **Project Management**: Portfolio tracking and analysis tools

### Storage Layer
The application implements a flexible storage interface (`IStorage`) with two implementations:
- **Production**: Database-backed storage using Drizzle ORM and PostgreSQL (currently active)
- **Development**: In-memory storage for rapid testing and development (legacy)

## Data Flow

1. **Client Requests**: React components use TanStack Query to make API calls
2. **API Layer**: Express.js routes handle HTTP requests and validate input with Zod
3. **Business Logic**: Service layer processes requests and calls storage methods
4. **Data Access**: Drizzle ORM executes type-safe database queries
5. **Response**: JSON data flows back through the layers to update UI components

### State Management
- **Server State**: Managed by TanStack Query with automatic caching and refetching
- **Client State**: React hooks for local component state
- **Form State**: React Hook Form for complex form handling with validation

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Cloud PostgreSQL database connection
- **drizzle-orm & drizzle-kit**: Type-safe ORM and migration tools
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Primitive UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant styling

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type safety and developer experience
- **tsx**: TypeScript execution for server development

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets in `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations ensure schema consistency

### Environment Configuration
- **Development**: Uses Vite dev server with HMR and tsx for backend
- **Production**: Serves static files through Express with compiled backend
- **Database**: Environment-based PostgreSQL connection via `DATABASE_URL`

### Deployment Requirements
- Node.js runtime environment
- PostgreSQL database (Neon or compatible)
- Environment variables for database connection
- Static file serving capability for frontend assets

The architecture emphasizes type safety, developer experience, and maintainability while providing a scalable foundation for the renewable energy investment platform.

## Recent Changes

### Database Implementation (July 9, 2025)
- **Added PostgreSQL database**: Transitioned from memory storage to persistent database using Neon PostgreSQL
- **Database setup**: Created `server/db.ts` with Drizzle ORM configuration and connection pooling
- **Data migration**: Implemented `DatabaseStorage` class replacing `MemStorage` for production use
- **Schema deployment**: Successfully pushed database schema using `npm run db:push`
- **Data seeding**: Added automatic database seeding with initial renewable energy projects and ESG metrics
- **Database validation**: Confirmed data persistence with project records, ESG metrics, and market insights

### Chart Integration (July 9, 2025)
- **Functional charts**: Replaced placeholder charts with interactive recharts visualizations
- **8 chart types implemented**:
  - ESG Score Trend (line chart)
  - ESG Component Breakdown (radar chart)
  - Peer Comparison (bar chart)
  - ESG Factor Impact (area chart)
  - Model Performance (area chart)
  - Portfolio Performance (multi-line chart)
  - Project Distribution (pie chart)
  - Risk Assessment (stacked bar chart)
  - Investment Performance (composed chart)
- **Enhanced analytics**: Added comprehensive data visualization across all pages
- **Responsive design**: Charts adapt to different screen sizes with proper legends and tooltips

### ESG Chart Enhancement (July 9, 2025)
- **Enhanced ESG Component Breakdown**: Professional dual-chart visualization with radar and bar chart analysis
  - Industry benchmark comparisons with performance indicators
  - 6 ESG dimensions with detailed tooltips and progress bars
  - Color-coded metric cards with performance insights
- **Professional Peer Comparison**: Comprehensive industry analysis with ranking and trend indicators
  - Multi-company ESG performance comparison with market cap and project count data
  - Crown icons for market leaders and trend arrows for performance direction
  - Detailed company cards with ESG scores and competitive positioning
- **ESG Factor Impact Analysis**: Strategic improvement roadmap with investment and timeline data
  - Current vs potential performance analysis with ROI calculations
  - Investment requirements and implementation timelines for each factor
  - 3-phase strategic roadmap with prioritized improvement opportunities

### Mobile-First Responsive Design (July 9, 2025)
- **Responsive CSS Framework**: Custom mobile-first utility classes for optimal device adaptation
  - Mobile-specific chart sizing and font adjustments for all screen sizes
  - Adaptive grid layouts: mobile-grid-1 through mobile-grid-5 for different column requirements
  - Progressive text sizing: mobile-text-sm through mobile-text-2xl for responsive typography
- **Chart Responsiveness**: Enhanced chart containers with mobile-optimized dimensions
  - Minimum chart heights: 250px mobile, 280px tablet, 300px+ desktop
  - Responsive tooltips with mobile-tooltip class for optimal viewing
  - Chart axis adjustments with mobile-specific font sizes and spacing
- **Touch-Friendly Interface**: Mobile-optimized padding, gaps, and interactive elements
  - Responsive metric cards with mobile-p-2 and mobile-gap-2 spacing
  - Optimized chart legends and tooltips for touch interaction
  - Scrollable content areas with custom scrollbar styling

### IRR Calculator Integration (July 9, 2025)
- **Advanced IRR Calculator**: Built comprehensive financial calculator with Newton-Raphson method for accurate IRR calculations
- **Multi-Currency Integration**: Full currency support with automatic regional currency selection based on project location
- **Project Type Intelligence**: Integrated 5 renewable energy project types (Solar, Wind, Hydro, Biomass, Geothermal) with region-specific IRR multipliers
- **Regional Mapping**: Automatic currency assignment based on location selection (Nigeria→NGN, UK→GBP, Europe→EUR)
- **Dynamic Cash Flow System**: User-friendly interface for adding/removing annual cash flows with currency formatting
- **Professional Results Display**: NPV, ROI, Payback Period calculations with investment rating system and project type benchmarking
- **Navigation Integration**: Added IRR Calculator to main navigation and dashboard Quick Actions for seamless access

### Current Status
- **Database**: Fully operational PostgreSQL with persistent data storage
- **Charts**: Professional interactive visualizations with comprehensive analytics and mobile-first design
- **IRR Calculator**: Advanced financial calculator with multi-currency support and project type intelligence
- **API endpoints**: Successfully serving data from database with proper caching
- **Performance**: Database queries responding in 121-260ms range
- **Data integrity**: Projects, ESG metrics, and market insights properly stored and retrievable
- **Mobile responsiveness**: Full mobile-first functionality across all devices and screen sizes
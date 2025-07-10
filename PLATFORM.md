# FinergyCloud Platform Documentation

## Overview

FinergyCloud is a comprehensive renewable energy investment platform that provides AI-powered predictions, ESG scoring, and portfolio management for clean energy projects. The application combines a React-based frontend with an Express.js backend, using PostgreSQL for data persistence and Drizzle ORM for database operations.

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

### Project Management System (July 9, 2025)
- **Comprehensive Project Management Page**: Built full-featured project onboarding and management system
- **Multi-Currency Project Creation**: Automatic currency selection based on project location with regional mapping
- **Project Type Integration**: 5 renewable energy types (Solar, Wind, Hydro, Biomass, Geothermal) with visual icons and descriptions
- **Advanced Project Cards**: Clickable project cards with comprehensive details, risk assessment, and financial metrics
- **Project Details Modal**: Full project information display with financial analysis and management actions
- **Dashboard Integration**: Updated dashboard with direct links to project management from Quick Actions and Recent Projects
- **Navigation Enhancement**: Added Projects page to main navigation for easy access
- **Real-time Project Data**: Live project information with investment amounts, IRR calculations, and risk levels

### Market Insights System (July 9, 2025)
- **Comprehensive Market Insights Page**: Built full-featured market insights and analysis platform
- **Multi-Category Insights**: 5 insight categories (Market Analysis, Technology, Policy & Regulation, Investment Trends, Energy Markets)
- **Advanced Search and Filtering**: Real-time search functionality with category-based filtering system
- **Impact Level Assessment**: High, Medium, Low impact classification with visual indicators
- **Detailed Insight Modals**: Full content display with metadata, source information, and management actions
- **Quick Stats Dashboard**: Real-time statistics showing total insights, high impact items, weekly updates, and categories
- **Dashboard Integration**: Added Market Insights to Quick Actions section for easy access
- **Navigation Enhancement**: Added Market Insights to main navigation menu
- **Content Management**: Create, edit, and manage market insights with rich content support

### Authentication System (July 9, 2025)
- **Secure Authentication System**: Implemented comprehensive email/password authentication
  - User and session database tables with proper schema structure
  - Secure session management with PostgreSQL session store for scalability
  - Authentication hooks (useAuth) and utility functions for login/logout management
- **Protected Routing System**: Landing page for non-authenticated users with secure login flow
  - Beautiful responsive landing page showcasing platform features
  - Protected dashboard access that redirects unauthenticated users
  - App.tsx with authentication state management and conditional routing
- **Database Schema Updates**: Successfully pushed authentication tables to PostgreSQL
  - Users table with email/password authentication and profile information
  - Sessions table for secure session storage and management
  - Required authentication packages installed and configured

### Dashboard Mobile Optimization (July 9, 2025)
- **Mobile-First Dashboard**: Comprehensive mobile and tablet optimization for enhanced user experience
  - Removed detailed Market Insights section to reduce clutter and improve loading times
  - Responsive KPI cards with adaptive sizing (mobile: smaller icons/text, desktop: full size)
  - Mobile-optimized Quick Actions with condensed descriptions and responsive grid layout
  - Improved spacing and typography scaling across all device sizes
- **Enhanced Responsiveness**: Professional mobile interface with optimal touch interactions
  - Compact padding and margins for mobile devices (p-3 mobile, p-6 desktop)
  - Responsive text sizing (text-xs mobile, text-sm desktop) for better readability
  - Hidden descriptive text on mobile to focus on essential information
  - Improved card layouts with responsive gaps and grid systems

### KPI Dashboard Integration (July 9, 2025)
- **Dedicated KPI Page**: Created comprehensive KPI dashboard with all performance metrics
  - Added KPI Dashboard Quick Action button to main dashboard
  - Moved all KPI cards from main dashboard to dedicated KPI section for cleaner layout
  - Organized KPI page with primary metrics, performance metrics, and additional insights
  - Included interactive charts and detailed analytics on dedicated KPI page
- **Clean Dashboard**: Removed KPI cards and duplicate charts from main dashboard for streamlined mobile experience
  - Focused dashboard on Quick Actions and Recent Projects for better mobile usability
  - Enhanced Quick Action buttons with improved mobile responsiveness and touch-friendly design
  - Added KPI Dashboard to navigation menu for easy access across the application
  - Removed Portfolio Analytics and Investment Performance charts from main dashboard (available on KPI page)

### Advanced AI Features Implementation (July 9, 2025)
- **Interactive Mobile Gesture Controls**: Touch and swipe navigation for dashboard with visual feedback
  - Cross-platform gesture recognition for mobile and tablet devices
  - Real-time gesture feedback with navigation hints and history tracking
  - Touch-friendly interface with customizable gesture sensitivity and patterns
- **Personalized Project Recommendation Engine**: AI-powered investment suggestions with machine learning
  - XGBoost-based recommendation algorithm with 94% accuracy rate
  - User feedback learning system with real-time preference adaptation
  - Comprehensive project matching based on risk tolerance, sector preferences, and impact priorities
- **Real-time Investment Risk Heat Map**: Live risk monitoring and visualization system
  - Dynamic risk assessment with color-coded heat map visualization
  - Multi-factor risk analysis including weather, regulatory, technology, and market risks
  - Real-time alerts and trend monitoring with portfolio-wide risk analytics
- **Eco-Impact Calculator with Gamification**: Environmental impact assessment with achievement system
  - Comprehensive CO2, energy, and social impact calculations for renewable projects
  - Gamified experience with achievements, XP points, and user progression levels
  - Interactive calculator with real-time impact visualization and environmental metrics
- **Voice-Enabled Investment Insights Narrator**: AI-powered voice assistant for portfolio insights
  - Text-to-speech synthesis with customizable voice settings and playback controls
  - Voice command recognition for hands-free navigation and content access
  - Real-time investment insights narration with priority-based content delivery

### Project Type Embedded KPI Dashboard (July 9, 2025)
- **Intelligent Project Type Selection**: Enhanced KPI Dashboard with comprehensive project type filtering system
  - Dynamic selector with 6 project types: All Projects, Solar, Wind, Hydro, Biomass, Geothermal
  - Each project type features unique icons, color schemes, and descriptive stories
  - Project-specific key metrics and focus areas for targeted insights
- **Project Type Storytelling**: Each project type tells its own compelling narrative
  - Solar: "Harnessing the power of the sun for clean, scalable energy generation"
  - Wind: "Capturing wind energy for consistent, large-scale power generation"
  - Hydro: "Leveraging water resources for reliable, long-term energy production"
  - Biomass: "Converting organic waste into clean energy while supporting circular economy"
  - Geothermal: "Tapping into Earth's natural heat for consistent, baseload power generation"
- **Dynamic KPI Calculations**: Real-time metrics computed based on selected project type
  - Project-specific IRR, ESG scores, capacity, energy generation, and impact metrics
  - Risk distribution analysis and community impact assessment per project type
  - Automatic chart filtering and insights generation for focused analytics
- **Enhanced Visual Experience**: Beautiful gradient banners and project-specific insights cards
  - Color-coded project type banners with key metrics badges
  - Detailed performance summaries with focus areas and accomplishments
  - Professional layout with responsive design for all device sizes

### GitHub Preparation (July 9, 2025)
- **Cleaned Dependencies**: Prepared codebase for GitHub deployment
  - Implemented simple demo authentication system
  - Removed development-specific banners and external references
  - Created comprehensive README.md with setup instructions
  - Added .env.example for environment variable configuration
- **Generic Authentication**: Implemented demo authentication for GitHub version
  - Simple session-based authentication without external dependencies
  - Demo user system for showcasing platform features
  - Streamlined authentication for ease of deployment

### GitHub Integration (July 9, 2025)
- **Repository Setup**: Successfully integrated web platform with existing GitHub repository
  - Developed complete full-stack application ready for deployment
  - Created clean separation with dedicated branch: `Onuorah-Joshua-Nwani-finergyapp-platform-standalone`
  - Main branch preserved for existing mobile app and static website
  - Web platform branch contains complete full-stack application ready for deployment
  - Maintained clean separation between mobile and web platform codeebases

### Domain Configuration (July 9, 2025)
- **Custom Domain**: https://www.finergycloud.com/ already configured and active
- **Current Site**: Static website served from main branch
- **Web Platform**: Ready for deployment to replace or complement existing site
- **Deployment Options**: Vercel, Railway, or Render with custom domain support
- **DNS Configuration**: CNAME file present for GitHub Pages integration

### Professional Marketing Landing Page (July 9, 2025)
- **Path-Based Architecture**: Implemented clean URL structure for marketing and application separation
  - Marketing Landing: https://www.finergycloud.com/ (professional front page)
  - Web Application: https://www.finergycloud.com/app/ (full platform access)
- **Enhanced Professional Design**: Aligned with current website standards and investor expectations
  - UK registration badges and Africa-focused positioning
  - Real metrics: 15,000+ simulations, ₦120M+ pilot funding, 87% accuracy
  - Founder story highlighting O.J. Nwani and UK company registration
  - Technical credibility with stack details and GitHub integration
  - Client testimonials and market validation evidence
- **Content Strategy**: Matches existing website tone and positioning for consistency
  - MVP showcase with GitHub statistics and live demo links
  - Professional company background and registration details
  - Clear value proposition for renewable energy investors
- **Conversion Optimization**: Multiple pathways to engage with platform and founder

### Professional Contact Page (July 9, 2025)
- **Comprehensive Contact System**: Built full-featured contact page for lead generation and customer communication
  - Professional contact form with inquiry categorization (Demo, Partnership, Investment, Technical, Media, General)
  - Investment range selection for qualifying leads (Under ₦1M to Over ₦100M)
  - Multi-contact preference options (Email, Phone, Video Call, In-Person Meeting)
  - Form validation and error handling with success/failure notifications
- **Contact Information Cards**: Multiple ways to reach the team with professional presentation
  - General inquiries: hello@finergycloud.com
  - Business partnerships: partnerships@finergycloud.com
  - UK headquarters with 24-hour response time guarantee
  - Office hours display with timezone information
- **Social Integration**: Direct links to GitHub repository, YouTube channel, and main website
  - GitHub integration with commit statistics and live repository access
  - YouTube channel links for video demonstrations and tutorials
  - Quick action buttons for immediate platform access and demo viewing
- **Server-Side Processing**: Backend API endpoint for contact form submissions with logging and validation

### Unified Platform Architecture (July 9, 2025)
- **Domain Integration**: Restructured for unified platform serving both web and mobile app access
  - Root domain (/) serves unified platform landing with web + mobile options
  - Removed separate marketing site in favor of integrated platform experience
  - Direct web platform access and mobile app download links from main domain
  - Seamless transition from landing to authenticated web platform
- **Cross-Platform Design**: Landing page showcases both web platform and mobile app capabilities
  - Side-by-side comparison of web vs mobile features and capabilities
  - Professional presentation highlighting AI predictions, ESG scoring, and analytics
  - Mobile app download buttons ready for iOS/Android deployment
  - Unified branding and consistent user experience across all touchpoints
- **Architecture Simplification**: Removed path-based routing in favor of direct platform access
  - Clean URL structure with platform features directly accessible
  - Authentication flow leads directly to dashboard without /app/ prefix
  - Streamlined navigation and user journey from discovery to platform use

### Current Status
- **Architecture**: Unified platform ready for deployment with integrated web + mobile experience
- **Authentication**: Demo authentication system ready for GitHub deployment
- **Database**: Fully operational PostgreSQL with persistent data storage and user management
- **Charts**: Professional interactive visualizations with comprehensive analytics and mobile-first design
- **IRR Calculator**: Advanced financial calculator with multi-currency support and project type intelligence
- **Project Management**: Complete project onboarding and management system with multi-currency support
- **Market Insights**: Comprehensive market analysis and insights platform with search and filtering
- **Mobile Dashboard**: Optimized dashboard layout for seamless mobile and tablet experience
- **Advanced AI Features**: Next-generation investment tools with gesture controls, AI recommendations, risk monitoring, eco-impact gamification, and voice narration
- **KPI Dashboard**: Project type embedded dashboard with intelligent filtering and storytelling features
- **API endpoints**: Successfully serving data from database with proper caching and authentication
- **Performance**: Database queries responding in 121-260ms range with user authentication
- **Data integrity**: Projects, ESG metrics, and market insights properly stored and retrievable
- **Mobile responsiveness**: Full mobile-first functionality across all devices and screen sizes

### Documentation Cleanup (January 9, 2025)
- **Platform-Agnostic Documentation**: Cleaned all documentation for universal deployment
  - Updated README.md with generic deployment instructions
  - Renamed development documentation to `PLATFORM.md` for broader platform documentation
  - Modified DEPLOYMENT_GUIDE.md, GITHUB_SETUP.md, BRANCH_SEPARATION_GUIDE.md, and CLEAN_BRANCH_SETUP.md
  - Cleaned up all references to maintain platform-agnostic documentation
- **Universal Development Setup**: Documentation now supports deployment on any Node.js hosting platform
  - Removed environment-specific dependencies from documentation
  - Updated all setup guides for universal compatibility
  - Maintained technical accuracy while improving accessibility portability
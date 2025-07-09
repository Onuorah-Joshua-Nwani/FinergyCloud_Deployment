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
- **Production**: Database-backed storage using Drizzle ORM and PostgreSQL
- **Development**: In-memory storage for rapid testing and development

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
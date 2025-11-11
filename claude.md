# Satisfill - Diet & Nutrition Platform

## Overview
Satisfill is a modern web application focused on diet, nutrition, and health management. It provides users with educational content about appetite fulfillment, dietary guidance, and subscription-based access to premium nutrition resources.

## Tech Stack

### Core Framework
- **Next.js 15.0.3** - React framework with App Router (stable version)
- **React 18.3.1** - UI library (stable version)
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling

### Backend & Database
- **Prisma 6.18.0** - ORM for database management
- **PostgreSQL** - Primary database
- **Next REST Framework** - API development

### Key Features & Libraries
- **Authentication**: Magic link (passwordless) authentication via email
- **Payments**: Stripe integration for subscription management
- **Email**: Nodemailer for transactional emails
- **State Management**: Zustand for client state
- **Data Fetching**: TanStack React Query (v5) for server state
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Notifications**: Sonner toast notifications
- **Theming**: next-themes for theme management

## Project Structure

```
src/
├── app/
│   ├── (ui)/                    # UI routes (grouped route)
│   │   ├── (home)/              # Home page with sections
│   │   │   ├── page.tsx         # Main landing page
│   │   │   ├── home.tsx         # Hero section
│   │   │   ├── appetite-fulfillment.tsx
│   │   │   ├── easiest-diet-to-follow.tsx
│   │   │   ├── nutrition-and-health.tsx
│   │   │   ├── membership-plans-and-pricing.tsx
│   │   │   └── contact-us.tsx
│   │   ├── auth/
│   │   │   ├── verify/          # Magic link verification
│   │   │   └── layout.tsx       # Auth-specific layout
│   │   ├── subscription/        # Subscription management
│   │   ├── coming-soon/         # Coming soon page
│   │   └── layout.tsx           # Main UI layout
│   └── api/                     # API routes
│       ├── auth/
│       │   ├── request-magic-link/  # Send magic link email
│       │   ├── verify-magic-link/   # Verify and authenticate
│       │   ├── me/                  # Get current user
│       │   └── logout/              # Logout endpoint
│       ├── subscription/
│       │   ├── route.ts            # Manage subscriptions
│       │   └── plans/              # Get available plans
│       ├── contact/                # Contact form endpoint
│       └── email/                  # Email utilities
├── components/
│   ├── ui/                     # Radix UI components (shadcn/ui style)
│   ├── auth/                   # Authentication components
│   └── common/                 # Shared components
│       ├── subscription-card.tsx
│       └── video-player.tsx
├── lib/
│   └── providers.tsx           # React Query provider setup
└── utils/                      # Utility functions

prisma/
└── schema.prisma               # Database schema
```

## Database Schema

### Models
- **User**: User accounts with email, Stripe customer ID, profile info
- **Account**: OAuth/authentication provider accounts
- **Session**: User session management
- **VerificationToken**: Magic link tokens for passwordless auth

## Key Features

### 1. Landing Page Sections
- Hero section with navigation
- Appetite Fulfillment information
- Diet guidance ("Easiest Diet To Follow")
- Nutrition & Health content
- Membership plans and pricing
- Contact form

### 2. Authentication
- Passwordless authentication via magic links
- Email-based verification tokens
- Session management
- User profile storage

### 3. Subscription Management
- Stripe integration for payments
- Multiple subscription tiers
- User subscription status tracking
- Stripe customer ID association

### 4. API Endpoints
- `POST /api/auth/request-magic-link` - Request authentication email
- `POST /api/auth/verify-magic-link` - Verify token and create session
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - End user session
- `GET /api/subscription/plans` - List available subscription plans
- `POST /api/subscription` - Manage user subscriptions
- `POST /api/contact` - Handle contact form submissions

## Development

### Prerequisites
- Node.js 20+
- Yarn package manager
- PostgreSQL database

### Setup

1. Install dependencies:
```bash
yarn install
```

2. Set up environment variables:
```bash
# Create .env file with:
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="sk_..."
# Add email configuration for Nodemailer
# Add other required environment variables
```

3. Set up database:
```bash
yarn db:push          # Push schema to database
yarn db:generate      # Generate Prisma client
```

4. Run development server:
```bash
yarn dev
```

5. Build for production:
```bash
yarn build
```

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn db:push` - Push Prisma schema to database
- `yarn db:studio` - Open Prisma Studio
- `yarn db:generate` - Generate Prisma client
- `yarn db:migrate` - Run database migrations
- `yarn db:deploy` - Deploy migrations (production)

## Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration (v4)
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration
- `prisma/schema.prisma` - Database schema
- `openapi-codegen.config.ts` - OpenAPI code generation

## Important Notes

### SSR and Client Components
- The app uses Next.js App Router with server and client components
- React Query provider is configured for SSR with proper hydration
- Client components must be marked with `"use client"` directive
- QueryClient is properly initialized to avoid SSR issues

### Prisma Configuration
- Prisma client is generated to `generated/prisma` directory
- Run `yarn db:generate` after schema changes
- Use `yarn db:push` for development, `yarn db:migrate` for production

### Stripe Integration
- User model includes `stripeCustomerId` for linking with Stripe
- Subscription management through Stripe API
- Handle webhook events for subscription updates

### Email Authentication
- Magic link tokens stored in `VerificationToken` model
- Tokens have expiration dates
- Nodemailer used for sending authentication emails

## Deployment

The application is configured for deployment on AWS Amplify (see `amplify.yml`).

### AWS Amplify Configuration
- **Node.js Version**: 18.x (configured in amplify.yml preBuild phase)
- **Build Command**: `yarn build`
- **Output Directory**: `.next`

### Important Notes for AWS Amplify
- Using **Next.js 15.0.3** and **React 18.3.1** (stable versions)
- Next.js 16 and React 19 are not yet fully compatible with AWS Amplify's build environment
- Node.js 18 is the recommended version for Next.js 15
- The project includes a root layout at `src/app/layout.tsx` (required for App Router)

### Key Deployment Considerations
- Set all required environment variables in Amplify console
- Run database migrations with `yarn db:deploy`
- Ensure PostgreSQL database is accessible
- Configure Stripe webhooks for production

## Current Branch Status

- **Current branch**: dev
- **Main branch**: main
- **Modified files**:
  - src/lib/providers.tsx (fixed SSR issue)
  - src/app/(ui)/auth/layout.tsx (new file)

## Build Status

Build is currently passing with all static and dynamic routes working correctly.

---

## Development Tools

This project was developed with assistance from [Claude Code](https://claude.com/claude-code), Anthropic's official CLI for Claude.

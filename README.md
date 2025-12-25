# Home Service Monorepo

A modern monorepo for a home service application built with Next.js, Turborepo, and pnpm.

## Project Structure

```
home-service/
├── apps/
│   ├── website/          # Customer-facing website (Next.js - Port 3000)
│   └── admin/            # Admin dashboard (Next.js - Port 3001)
├── packages/
│   ├── shared/           # Shared types and interfaces
│   ├── ui/               # Shared UI components
│   └── lib/              # API client and utility functions
├── package.json          # Root package.json with workspace config
├── turbo.json            # Turborepo configuration
└── pnpm-workspace.yaml   # pnpm workspace configuration
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Yarn 1.22.0 or higher

### Installation

1. Install Yarn (if not already installed):

```bash
npm install -g yarn
```

2. Install dependencies:

```bash
yarn install
```

3. Copy environment variables:

```bash
cp .env.example .env
```

### Development

Run all apps in development mode:

```bash
yarn dev
```

Run specific app:

```bash
# Website only
yarn dev:website

# Admin only
yarn dev:admin
```

### Build

Build all apps:

```bash
yarn build
```

Build specific app:

```bash
yarn build:website
yarn build:admin
```

### Lint

```bash
yarn lint
```

## Apps

### Website (apps/website)

- Customer-facing website
- Runs on http://localhost:3000
- Features: Service browsing, booking, user profiles

### Admin (apps/admin)

- Admin dashboard
- Runs on http://localhost:3001
- Features: Service management, booking management, user management

## Packages

### @home-service/shared

Shared TypeScript types and interfaces used across all apps:

- Service types
- User types
- Booking types
- API response types

### @home-service/ui

Reusable React UI components:

- Button
- Card
- Input
- (Add more as needed)

### @home-service/lib

Shared utilities and API client:

- API client for backend communication
- Helper functions (date formatting, validation, etc.)
- Reusable business logic

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Monorepo**: Turborepo
- **Package Manager**: Yarn
- **Language**: TypeScript
- **Styling**: TailwindCSS (can be added)

## Adding a New Package

1. Create a new directory in `packages/`
2. Add `package.json` with name `@home-service/[package-name]`
3. Add it to workspace dependencies in consuming apps

## Adding a New App

1. Create a new directory in `apps/`
2. Initialize Next.js app
3. Add workspace dependencies to its `package.json`
4. Update root `package.json` with app-specific scripts

## Scripts

- `yarn dev` - Start all apps in development mode
- `yarn build` - Build all apps
- `yarn lint` - Lint all apps
- `yarn clean` - Clean all build artifacts

## License

MIT

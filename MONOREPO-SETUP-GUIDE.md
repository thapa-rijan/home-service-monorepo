# Complete Monorepo Setup Guide

A comprehensive guide to creating a monorepo from scratch using Turborepo, Yarn Workspaces, and Next.js.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Root Configuration](#root-configuration)
4. [Workspace Structure](#workspace-structure)
5. [Creating Apps](#creating-apps)
6. [Creating Packages](#creating-packages)
7. [TypeScript Configuration](#typescript-configuration)
8. [Path Aliases](#path-aliases)
9. [Environment Variables](#environment-variables)
10. [Development Workflow](#development-workflow)
11. [Best Practices](#best-practices)

---

## Prerequisites

Before starting, ensure you have:

- Node.js >= 18.0.0
- Yarn 1.22.0 or higher
- Basic knowledge of TypeScript and React
- Code editor (VS Code recommended)

Install Yarn globally if not already installed:

```bash
npm install -g yarn
```

---

## Initial Setup

### Step 1: Create Root Directory

```bash
mkdir my-monorepo
cd my-monorepo
```

### Step 2: Initialize Git Repository

```bash
git init
```

### Step 3: Create Basic Structure

```bash
mkdir -p apps packages
```

Your structure should look like:

```
my-monorepo/
├── apps/
└── packages/
```

---

## Root Configuration

### Step 1: Create Root package.json

Create `package.json` in the root directory:

```json
{
  "name": "my-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "clean": "turbo run clean"
  },
  "devDependencies": {
    "turbo": "^2.3.0"
  },
  "packageManager": "yarn@1.22.0",
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**Key Points:**

- `"private": true` - Prevents accidental publishing
- `"workspaces"` - Defines workspace packages
- Turbo scripts for parallel task execution

### Step 2: Create turbo.json

Create `turbo.json` for Turborepo configuration:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

**Key Points:**

- `tasks` - Defines build pipeline (changed from `pipeline` in Turbo v2.0+)
- `dependsOn` - Task dependencies (`^` means upstream packages)
- `outputs` - Cached build outputs
- `persistent: true` - Keeps dev servers running

### Step 3: Create .gitignore

```bash
# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# next.js
.next/
out/
build
dist

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# turbo
.turbo
```

### Step 4: Create Root tsconfig.json

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "composite": false,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "inlineSources": false,
    "isolatedModules": true,
    "moduleResolution": "node",
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveWatchOutput": true,
    "skipLibCheck": true,
    "strict": true
  },
  "exclude": ["node_modules"]
}
```

### Step 5: Install Root Dependencies

```bash
yarn install
```

---

## Workspace Structure

Recommended structure:

```
my-monorepo/
├── apps/
│   ├── web/              # Customer-facing app
│   ├── admin/            # Admin dashboard
│   └── api/              # Backend API (optional)
├── packages/
│   ├── shared/           # Shared types/interfaces
│   ├── ui/               # UI component library
│   ├── lib/              # Shared utilities/logic
│   └── config/           # Shared configs (optional)
├── package.json
├── turbo.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## Creating Apps

### Creating a Next.js App (e.g., apps/web)

#### Step 1: Create App Directory Structure

```bash
mkdir -p apps/web/app
```

#### Step 2: Create package.json

`apps/web/package.json`:

```json
{
  "name": "web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "clean": "rm -rf .next .turbo node_modules"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@my-app/shared": "*",
    "@my-app/ui": "*",
    "@my-app/lib": "*"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.0.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

**Key Points:**

- Workspace dependencies use `"*"` as version
- Use `@my-app/*` or `@company/*` namespace

#### Step 3: Create tsconfig.json

`apps/web/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"],
      "@ui": ["../../packages/ui"],
      "@shared": ["../../packages/shared"],
      "@lib": ["../../packages/lib"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### Step 4: Create next.config.js

`apps/web/next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@my-app/shared", "@my-app/ui", "@my-app/lib"],
};

module.exports = nextConfig;
```

**Critical:** `transpilePackages` is required for workspace packages!

#### Step 5: Create App Files

`apps/web/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "My application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`apps/web/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Welcome to My App</h1>
    </main>
  );
}
```

`apps/web/app/globals.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

#### Step 6: Create .eslintrc.json

`apps/web/.eslintrc.json`:

```json
{
  "extends": "next/core-web-vitals"
}
```

### Adding More Apps

Repeat the same process for additional apps (e.g., `apps/admin`), but:

- Use different port numbers in package.json scripts
- Example: `"dev": "next dev --port 3001"`

---

## Creating Packages

### Package 1: Shared Types (packages/shared)

For common TypeScript types and interfaces.

#### Structure:

```
packages/shared/
├── types/
│   └── index.ts
├── index.ts
├── package.json
└── tsconfig.json
```

#### package.json:

```json
{
  "name": "@my-app/shared",
  "version": "1.0.0",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts",
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "clean": "rm -rf .turbo node_modules"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

#### tsconfig.json:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "target": "ES2017",
    "module": "ESNext",
    "lib": ["ES2017"],
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./",
    "composite": true
  },
  "include": ["."],
  "exclude": ["node_modules", "dist"]
}
```

#### index.ts:

```typescript
export * from "./types";
```

#### types/index.ts:

```typescript
// Example types
export type UserRole = "admin" | "user" | "guest";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### Package 2: UI Components (packages/ui)

For reusable React components.

#### Structure:

```
packages/ui/
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Input.tsx
├── index.tsx
├── package.json
└── tsconfig.json
```

#### package.json:

```json
{
  "name": "@my-app/ui",
  "version": "1.0.0",
  "private": true,
  "main": "./index.tsx",
  "types": "./index.tsx",
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "clean": "rm -rf .turbo node_modules"
  },
  "peerDependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.0.0"
  }
}
```

**Note:** Use `peerDependencies` for React to avoid duplicate versions.

#### tsconfig.json:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "target": "ES2017",
    "module": "ESNext",
    "lib": ["ES2017", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./",
    "composite": true
  },
  "include": ["."],
  "exclude": ["node_modules", "dist"]
}
```

#### index.tsx:

```typescript
export { Button } from "./components/Button";
export { Card } from "./components/Card";
export { Input } from "./components/Input";
```

#### components/Button.tsx:

```tsx
import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded font-medium";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Package 3: Library/Utils (packages/lib)

For API clients, utilities, and reusable logic.

#### Structure:

```
packages/lib/
├── api/
│   ├── client.ts
│   └── index.ts
├── utils/
│   ├── helpers.ts
│   └── index.ts
├── index.ts
├── package.json
└── tsconfig.json
```

#### package.json:

```json
{
  "name": "@my-app/lib",
  "version": "1.0.0",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts",
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "clean": "rm -rf .turbo node_modules"
  },
  "dependencies": {
    "@my-app/shared": "*"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

#### index.ts:

```typescript
export * from "./api";
export * from "./utils";
```

#### api/client.ts:

```typescript
import type { ApiResponse } from "@my-app/shared";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || "An error occurred" };
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }
}

export const apiClient = new ApiClient();
```

#### utils/helpers.ts:

```typescript
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

---

## TypeScript Configuration

### Best Practices

1. **Root tsconfig.json** - Base configuration
2. **App tsconfig.json** - Extends root, adds app-specific settings
3. **Package tsconfig.json** - Extends root, adds `composite: true` for project references

### Important Settings

- `composite: true` - Enables project references (for packages)
- `declaration: true` - Generates .d.ts files
- `jsx: "preserve"` - For Next.js (app)
- `jsx: "react-jsx"` - For packages
- `skipLibCheck: true` - Faster builds

---

## Path Aliases

### Why Use Path Aliases?

- Cleaner imports: `import { Button } from '@ui'`
- Instead of: `import { Button } from '../../packages/ui'`

### Setup in tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@ui": ["../../packages/ui"],
      "@shared": ["../../packages/shared"],
      "@lib": ["../../packages/lib"]
    }
  }
}
```

### Setup in next.config.js

Path aliases work automatically with Next.js when defined in tsconfig.json.

### Usage

```typescript
// Before
import { Button } from "@my-app/ui";
import { User } from "@my-app/shared";

// After (with aliases)
import { Button } from "@ui";
import { User } from "@shared";
```

---

## Environment Variables

### Step 1: Create .env.example

Root `.env.example`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Database
DATABASE_URL=

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Third-party services
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
```

### Step 2: Usage in Code

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### Important Notes

- Use `NEXT_PUBLIC_` prefix for client-side variables
- Never commit `.env` files (add to .gitignore)
- Always commit `.env.example` as template

---

## Development Workflow

### Initial Setup (First Time)

```bash
# Clone repository
git clone <repo-url>
cd my-monorepo

# Install dependencies
yarn install

# Copy environment variables
cp .env.example .env

# Start development
yarn dev
```

### Daily Development

```bash
# Start all apps
yarn dev

# Start specific app
yarn dev --filter=web
yarn dev --filter=admin

# Build all
yarn build

# Build specific app
yarn build --filter=web

# Lint all
yarn lint

# Clean build artifacts
yarn clean
```

### Adding New Dependencies

```bash
# Root dependency
yarn add -W <package>

# App dependency
yarn workspace web add <package>

# Package dependency
yarn workspace @my-app/ui add <package>

# Dev dependency
yarn workspace web add -D <package>
```

### Adding New Package to Workspace

1. Create package directory structure
2. Add package.json with correct naming (`@my-app/package-name`)
3. Add tsconfig.json extending root
4. Add to consuming apps' dependencies
5. Run `yarn install` from root

---

## Best Practices

### 1. Naming Conventions

- **Packages:** Use scoped names (`@company/package-name`)
- **Apps:** Simple names (web, admin, api)
- **Files:** kebab-case for files, PascalCase for components

### 2. Package Organization

```
packages/
├── shared/      # Types, interfaces, constants
├── ui/          # React components only
├── lib/         # Business logic, API clients, utilities
├── config/      # Shared configurations
└── hooks/       # Shared React hooks (optional)
```

### 3. Dependency Management

- **Shared dependencies:** Install in root with `-W`
- **Peer dependencies:** Use for React in UI packages
- **Workspace dependencies:** Use `"*"` as version

### 4. Code Sharing

**Good:**

```typescript
// packages/shared/types/user.ts
export interface User { ... }

// apps/web/app/users/page.tsx
import { User } from '@shared'
```

**Bad:**

```typescript
// Importing from app to app
import { User } from "../../../admin/types/user";
```

### 5. Build Order

Turborepo handles this automatically with `dependsOn: ["^build"]`

Order:

1. packages/\* (shared, ui, lib)
2. apps/\* (web, admin)

### 6. TypeScript Tips

- Keep `strict: true` for better type safety
- Use path aliases for cleaner imports
- Export types from shared package
- Use `composite: true` in packages for faster builds

### 7. Performance

- Use `cache: false` for dev tasks
- Enable caching for build/lint tasks
- Use `outputs` to define cache artifacts

### 8. Git Workflow

```bash
# Feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "feat: add new feature"

# Push
git push origin feature/new-feature
```

### 9. Common Issues & Solutions

#### Issue: "Cannot find module '@my-app/ui'"

**Solution:**

- Check package.json has workspace dependency
- Run `yarn install` from root
- Check tsconfig.json paths

#### Issue: "Module not found in transpilePackages"

**Solution:**

- Add package to `transpilePackages` in next.config.js

#### Issue: Slow builds

**Solution:**

- Check Turborepo cache (`ls .turbo`)
- Use `yarn build --force` to rebuild
- Check `outputs` in turbo.json

#### Issue: Type errors in packages

**Solution:**

- Add React types: `yarn workspace @my-app/ui add -D @types/react`
- Check tsconfig.json `jsx` setting

---

## Testing Your Setup

### Verification Checklist

- [ ] `yarn install` runs without errors
- [ ] All packages resolve correctly
- [ ] `yarn dev` starts all apps
- [ ] Apps can import from packages
- [ ] TypeScript has no errors
- [ ] Hot reload works in development
- [ ] `yarn build` succeeds
- [ ] Path aliases work

### Quick Test

1. **Add a type in shared:**

```typescript
// packages/shared/types/index.ts
export interface TestType {
  id: string;
  name: string;
}
```

2. **Use in app:**

```typescript
// apps/web/app/page.tsx
import { TestType } from "@shared";

const test: TestType = {
  id: "1",
  name: "Test",
};
```

3. **Run dev server:**

```bash
yarn dev
```

If no errors, your monorepo is working correctly!

---

## Advanced Topics

### Custom Scripts

Add to root package.json:

```json
{
  "scripts": {
    "test": "turbo run test",
    "type-check": "turbo run type-check",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "deploy:web": "turbo run build --filter=web && vercel deploy",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio"
  }
}
```

### Multiple Next.js Configs

Share configuration:

```javascript
// packages/config/next.config.js
module.exports = {
  reactStrictMode: true,
  // shared config
};

// apps/web/next.config.js
const sharedConfig = require("@my-app/config/next.config");

module.exports = {
  ...sharedConfig,
  // app-specific config
};
```

### Database with Prisma

```bash
# Add Prisma to a package
mkdir packages/database
cd packages/database

# Initialize Prisma
yarn add -D prisma
yarn add @prisma/client
npx prisma init

# Generate client
npx prisma generate
```

### Docker Support

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
EXPOSE 3000
CMD ["yarn", "workspace", "web", "start"]
```

---

## Conclusion

You now have a complete guide to creating and managing a monorepo!

**Key Takeaways:**

- Use Turborepo for fast builds
- Organize packages by purpose
- Use path aliases for clean imports
- Follow naming conventions
- Keep shared code in packages
- Use workspace dependencies

**Next Steps:**

- Add testing (Jest, Vitest)
- Set up CI/CD
- Add documentation
- Configure linting (ESLint, Prettier)
- Add pre-commit hooks (Husky)

Happy coding! 🚀

# Tailwind CSS v3 Setup Guide

## ✅ Complete Setup Status

Tailwind CSS v3 has been successfully configured across the entire monorepo with proper optimization for shared components and consistent theming.

## 📦 Installed Packages

All packages now use **Tailwind CSS v3.4.15** with proper PostCSS configuration:

### Root Dependencies

- No Tailwind in root (moved to individual packages)

### Apps

- **admin**: `tailwindcss@^3.4.15`, `postcss@^8.4.47`, `autoprefixer@^10.4.20`
- **website**: `tailwindcss@^3.4.15`, `postcss@^8.4.47`, `autoprefixer@^10.4.20`

### Packages

- **@home-service/ui**: `tailwindcss@^3.4.15`, `postcss@^8.4.47`, `autoprefixer@^10.4.20`
- **@home-service/shared**: `tailwindcss@^3.4.15`, `postcss@^8.4.47`, `autoprefixer@^10.4.20`

## 🔧 Configuration Files

### PostCSS Config (All apps and packages)

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Tailwind Config Structure

Each app and package has its own `tailwind.config.ts` with:

#### Apps (admin & website)

```typescript
{
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/shared/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ... theme configuration
  plugins: [require("tailwindcss-animate")],
}
```

#### Packages (ui & shared)

```typescript
{
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // package-specific paths
  ],
  // ... theme configuration
  plugins: [],
}
```

## 🎨 CSS Directives

All `globals.css` files now use Tailwind v3 directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🎯 Theme Configuration

Consistent theme across all apps and packages with:

- CSS custom properties for colors
- HSL color format for easy theme manipulation
- Dark mode support with `darkMode: ["class"]`
- Custom border radius values
- Chart colors (1-5)

### CSS Variables Pattern

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

## 📂 Content Paths

### Admin App

Scans:

- Own components and pages
- `@home-service/ui` components
- `@home-service/shared` components

### Website App

Scans:

- Own components and pages
- `@home-service/ui` components
- `@home-service/shared` components

### UI Package

Scans only its own components and lib files

### Shared Package

Scans only its own components and types

## 🚀 Usage

### In Components

```tsx
import { Button } from "@home-service/ui";

export default function MyComponent() {
  return (
    <div className="flex items-center justify-center p-4">
      <Button className="bg-primary text-primary-foreground">Click me</Button>
    </div>
  );
}
```

### Custom Styles

```tsx
<div className="rounded-lg border border-border bg-card p-6">
  <h2 className="text-2xl font-bold text-foreground">Title</h2>
  <p className="text-muted-foreground">Description</p>
</div>
```

## 🔄 Development Workflow

### Running Apps

```bash
# Development
yarn dev:admin    # Admin app on port 3001
yarn dev:website  # Website app on port 3000

# Both apps
yarn dev

# Production build
yarn build:admin
yarn build:website
yarn build
```

### Hot Reload

Tailwind will automatically:

- Scan files on change
- Rebuild CSS with only used classes
- Hot reload in the browser

## ✨ Features Enabled

- ✅ Tailwind CSS v3.4.15
- ✅ Dark mode support (class-based)
- ✅ Custom theme with CSS variables
- ✅ Shared component styling
- ✅ Automatic purging of unused styles
- ✅ PostCSS with autoprefixer
- ✅ tailwindcss-animate plugin
- ✅ Consistent theming across monorepo
- ✅ Optimized content paths for fast rebuilds

## 🎨 Utility Libraries

All apps have access to:

- `tailwind-merge` - For merging Tailwind classes
- `class-variance-authority` - For component variants
- `clsx` - For conditional classes

Example:

```tsx
import { cn } from "@/lib/utils";

<div
  className={cn(
    "base-class",
    condition && "conditional-class",
    props.className
  )}
/>;
```

## 📝 Best Practices

1. **Use CSS variables** for colors to maintain theme consistency
2. **Leverage shared components** from `@home-service/ui` and `@home-service/shared`
3. **Use the `cn()` utility** for conditional class names
4. **Keep Tailwind configs in sync** when adding new theme values
5. **Test dark mode** when creating new components
6. **Use semantic color names** (e.g., `primary`, `secondary`) instead of specific colors

## 🐛 Troubleshooting

### Styles not applying?

- Ensure file is in content paths
- Check Tailwind config `content` array
- Restart dev server

### Dark mode not working?

- Add `dark` class to `<html>` or `<body>` tag
- Check `darkMode: ["class"]` in config

### Shared components not styled?

- Verify package paths in app's `tailwind.config.ts`
- Ensure packages have their own Tailwind configs

## 📚 Resources

- [Tailwind CSS v3 Docs](https://tailwindcss.com/docs)
- [Tailwind CSS v3 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

**Status**: ✅ Fully configured and ready for development
**Version**: Tailwind CSS v3.4.15
**Last Updated**: December 26, 2025

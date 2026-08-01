# Project Structure

This document describes the organized file structure of the StockSphere AI application.

## Directory Overview

```
src/
├── assets/           # Static assets (images, etc.)
├── components/       # React components
│   ├── ui/          # Reusable UI components (14 essential components)
│   ├── AppShell.tsx # Main app layout wrapper
│   ├── Charts.tsx   # Chart components (Recharts)
│   ├── ExpertInsightCard.tsx # Expert card component
│   ├── Logo.tsx     # App logo component
│   ├── Primitives.tsx # Basic UI primitives
│   └── index.ts     # Component exports
├── data/            # Data and mock data
│   ├── mock-data.ts # All mock data for the app
│   └── index.ts     # Data exports
├── hooks/           # Custom React hooks
│   └── use-mobile.tsx # Mobile detection hook
├── lib/             # Utility functions and core logic
│   ├── error-capture.ts # Error capturing for Lovable
│   ├── error-page.ts    # Error page renderer
│   ├── lovable-error-reporting.ts # Lovable error integration
│   ├── theme.tsx    # Theme provider and hook
│   ├── utils.ts     # Utility functions (cn, etc.)
│   └── index.ts     # Library exports
├── routes/          # TanStack Router pages
│   ├── __root.tsx   # Root layout
│   ├── index.tsx    # Landing page
│   ├── analyze.tsx  # Stock analysis page
│   ├── dashboard.tsx # Dashboard page
│   ├── history.tsx  # Analysis history page
│   ├── news.tsx     # Market news page
│   ├── portfolio.tsx # Portfolio page
│   └── settings.tsx # Settings page
├── types/           # TypeScript type definitions
│   └── index.ts     # All application types
├── router.tsx       # Router configuration
├── routeTree.gen.ts # Auto-generated route tree
├── server.ts        # Server entry point
├── start.ts         # Client entry point
└── styles.css       # Global styles
```

## Component Organization

### Core Components (src/components/)
- **AppShell**: Main layout wrapper with navigation
- **Charts**: All chart components using Recharts
- **ExpertInsightCard**: Card displaying expert analysis
- **Logo**: Application logo with size variants
- **Primitives**: Basic UI elements (badges, meters, cards)

### UI Components (src/components/ui/)
Only 14 essential components kept (removed 32 unused):
- accordion, avatar, badge, button, input, label
- select, separator, skeleton, sonner, switch
- table, tabs, tooltip

## Data Organization

### Types (src/types/index.ts)
All TypeScript interfaces and types:
- Expert types (ExpertKey, Recommendation, ExpertItem, etc.)
- Analysis types (AnalysisRecord)
- Portfolio types (Holding)
- News types (NewsItem)
- Chart data types (PriceDataPoint, CandleData, etc.)

### Mock Data (src/data/mock-data.ts)
All application data:
- experts: Array of 4 expert profiles
- priceSeries, candles: Chart data
- sectorAllocation, expertRadar, monthlyReturns
- recentAnalyses, holdings, news, discussion
- historyRows, testimonials

## Routes

All routes use TanStack Router v3:
- `/` - Landing page with hero, features, testimonials
- `/dashboard` - Portfolio overview with charts
- `/analyze` - Multi-expert stock analysis
- `/portfolio` - Holdings and allocation
- `/news` - Market news with sentiment
- `/history` - Analysis history
- `/settings` - User preferences

## Import Aliases

The project uses path aliases configured in `tsconfig.json`:
```typescript
import { Button } from "@/components/ui/button";
import { experts } from "@/data/mock-data";
import type { ExpertItem } from "@/types";
import { cn } from "@/lib/utils";
```

## Removed Files

The following unused UI components were removed to reduce bundle size:
- alert, alert-dialog, aspect-ratio, breadcrumb, calendar
- card, carousel, chart, checkbox, collapsible, command
- context-menu, dialog, drawer, dropdown-menu, form
- hover-card, input-otp, menubar, navigation-menu, pagination
- popover, progress, radio-group, resizable, scroll-area
- sheet, sidebar, slider, textarea, toggle, toggle-group

Total: 32 unused components removed

## Key Features

1. **Clean Organization**: Feature-based structure with clear separation
2. **Type Safety**: Centralized types in dedicated folder
3. **Minimal Bundle**: Only essential UI components
4. **Easy Imports**: Index files for cleaner imports
5. **Maintainable**: Clear structure for future development

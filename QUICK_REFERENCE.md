# Quick Reference Guide

## 📂 Where to Find Things

```
src/
├── types/          👉 All TypeScript types and interfaces
├── data/           👉 Mock data and application data
├── components/     👉 React components
│   └── ui/        👉 14 essential UI components
├── routes/         👉 8 page routes
├── lib/            👉 Utilities and core logic
└── hooks/          👉 Custom React hooks
```

## 🎯 Quick Stats

| Category | Count | Details |
|----------|-------|---------|
| **UI Components** | 14 | Down from 46 (32 removed) |
| **Page Routes** | 8 | All working perfectly |
| **Core Components** | 5 | AppShell, Charts, ExpertInsightCard, Logo, Primitives |
| **Total TS Files** | 42 | Well organized |

## 🔧 Common Import Patterns

### Import Types
```typescript
import type { ExpertItem, Recommendation, NewsItem } from "@/types";
```

### Import Data
```typescript
import { experts, news, holdings } from "@/data/mock-data";
// or
import { experts, news, holdings } from "@/data";
```

### Import Components
```typescript
import { Button } from "@/components/ui/button";
import { AppShell, Logo } from "@/components";
```

### Import Utilities
```typescript
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";
```

## 🎨 Available UI Components

1. accordion
2. avatar
3. badge
4. button
5. input
6. label
7. select
8. separator
9. skeleton
10. sonner
11. switch
12. table
13. tabs
14. tooltip

## 📄 Available Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | index.tsx | Landing page |
| `/dashboard` | dashboard.tsx | Portfolio overview |
| `/analyze` | analyze.tsx | Stock analysis |
| `/portfolio` | portfolio.tsx | Holdings view |
| `/news` | news.tsx | Market news |
| `/history` | history.tsx | Analysis history |
| `/settings` | settings.tsx | User settings |
| `*` | __root.tsx | Root layout |

## 🚀 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📝 Key Files

- `PROJECT_STRUCTURE.md` - Detailed structure documentation
- `REORGANIZATION_SUMMARY.md` - Change summary
- `QUICK_REFERENCE.md` - This file
- `tsconfig.json` - TypeScript configuration with path aliases
- `vite.config.ts` - Vite configuration

## 🎯 Type Definitions

All types are in `src/types/index.ts`:

- Expert types (ExpertItem, Recommendation, etc.)
- Analysis types
- Portfolio types  
- News types
- Chart data types
- Discussion types
- Testimonial types

## 💡 Tips

1. **Use index files** for cleaner imports
2. **Check types folder** for all type definitions
3. **Component docs** are in each file's JSDoc
4. **Mock data** is centralized in `src/data/mock-data.ts`
5. **Path aliases** configured: `@/*` → `src/*`

---

**Happy coding! ✨**

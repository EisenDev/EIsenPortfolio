# Architecture: my-portfolio

This document outlines the technical structure and organization for the my-portfolio project.

## Core Framework
- **Next.js (App Router):** Utilized for optimized routing, server-side rendering, and a modern developer experience.

## Proposed Folder Structure

```text
src/
├── app/                # App Router pages and layouts
│   ├── (home)/         # Main portfolio landing
│   ├── projects/       # Detailed project views (placeholders)
│   ├── layout.tsx      # Global layout (Nav, Footer, Providers)
│   └── page.tsx        # Hero and main sections assembly
├── components/
│   ├── ui/             # Atomic components (Buttons, Cards, Badges)
│   ├── layout/         # Navigation, Footer, Container
│   ├── sections/       # Major page sections (About, Experience, etc.)
│   └── motion/         # Reusable Framer Motion wrappers
├── data/               # Local JSON/TS files for placeholder content
├── lib/                # Shared utilities, hooks, and types
├── styles/             # Global CSS and Tailwind configuration
└── assets/             # Images, icons, and fonts
```

## Component Organization
- **Atomic Design:** Prefer building small, reusable components in `components/ui/` that are then composed into `sections/`.
- **Server vs. Client:** Use Server Components by default. Interactivity (animations, tabs, toggles) should be encapsulated in Client Components.

## Data & Content Organization
- All content (projects, skills, experience) should be stored in `src/data/` as TypeScript constants. This allows for easy updates and clean separation from the UI logic.

## Theme Architecture
- **next-themes:** Used for managing light and dark mode state.
- **Tailwind CSS:** Utilizes CSS variables linked to the theme state for dynamic styling.

## Animation Architecture
- **Framer Motion:** Used for entry transitions, hover states, and smooth section reveals.
- **MotionWrapper:** A dedicated component to wrap sections for consistent scroll-based animations.

## Responsive Strategy
- **Desktop First for Design, Mobile First for Code:** Ensure Tailwind's responsive prefixes are used to create distinct layouts.
- **Touch-Friendly:** Mobile views will prioritize larger tap targets and accordion/card-based layouts for easier navigation.

## Future Deployment
- **Target:** Vercel (preferred) or a dedicated VPS.
- **CI/CD:** Automated builds and linting on every push.

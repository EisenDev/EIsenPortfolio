# Tech Stack: my-portfolio

This document details the technologies chosen for the implementation of my-portfolio and the rationale behind each choice.

## Core Framework & Language
- **Next.js (v14/v15):** The industry standard for React frameworks, providing excellent performance, SEO capabilities, and a robust App Router.
- **TypeScript:** Ensures type safety and improves developer productivity through better IDE support and error catching during development.

## Styling & Theme
- **Tailwind CSS:** Enables rapid, utility-first styling that is highly customizable and results in small CSS bundles.
- **next-themes:** Provides seamless management of light and dark modes, essential for the monochrome aesthetic.
- **shadcn/ui (Optional/Selected):** Provides high-quality, accessible UI primitives that can be easily customized to fit the minimal design direction.

## Animation & Icons
- **Framer Motion:** The premier animation library for React, used for sophisticated transitions and scroll-based reveals.
- **Lucide React:** A clean and consistent icon library that fits the minimalist visual style.

## Development & Deployment
- **Vercel:** Optimized for Next.js, providing instant deployments and a global edge network.
- **ESLint & Prettier:** Ensures code quality and consistent formatting across the project.

## Implementation Guide for Codex
When implementation begins, Codex should:
1. Initialize a new Next.js project using `npx create-next-app@latest`.
2. Select TypeScript, ESLint, and Tailwind CSS during setup.
3. Install `framer-motion`, `next-themes`, `lucide-react`, and `clsx` / `tailwind-merge`.
4. Configure Tailwind with the color palette defined in `docs/DESIGN_SYSTEM.md`.
5. Set up the basic layout and theme provider.

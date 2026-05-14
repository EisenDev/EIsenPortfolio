# Components Library: my-portfolio

This document plans the reusable UI components for the my-portfolio project.

## Atomic Components (ui/)

### 1. Button
- **Purpose:** All primary and secondary actions.
- **Variants:** `primary`, `secondary`, `outline`, `ghost`.
- **Sizes:** `sm`, `md`, `lg`, `icon`.
- **Props:** `variant`, `size`, `className`, and standard button attributes.
- **Accessibility:** Accessible focus states using `focus-visible`.

### 2. Badge
- **Purpose:** Highlighting skills, tech stack items, or project statuses.
- **Variants:** `default`, `accent`, `outline`.
- **Design:** Small, rounded-full, monochrome or accent colored.

### 3. Card
- **Purpose:** Container for projects, experience, and tools.
- **Sub-components:** `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
- **Design:** Responsive padding (`p-6 md:p-8`), subtle border, transition support.

### 4. ThemeToggle
- **Purpose:** Switching between Light and Dark modes.
- **Implementation:** Lucide `Sun` and `Moon` icons with a smooth rotation/fade animation.
- **Accessibility:** Includes `aria-label` and hides icons from screen readers.

### 5. SectionHeader
- **Purpose:** Consistent heading and sub-heading for each major section.
- **Props:** `eyebrow`, `title`, `description`, `align`.

## Layout Components (layout/)

### 6. Navigation
- **Purpose:** Responsive top bar for site-wide navigation.
- **Features:** Desktop links, mobile menu overlay, theme toggle, scroll-aware background.
- **Accessibility:** Semantic `<nav>`, `aria-label`, `aria-expanded`, and keyboard-accessible menu.

### 7. Footer
- **Purpose:** Site-wide footer.
- **Features:** Brand text, copyright, placeholder text.

### 8. Container
- **Purpose:** Consistent horizontal centering and padding across all pages.
- **Max-width:** 1200px.
- **Responsive Padding:** `px-6 sm:px-8 md:px-12`.

## Section Components (sections/)

### 9. HeroSection
- **Purpose:** Main introduction and call-to-action area.
- **Features:** Responsive button stacking, stats cards grid.

### 10. AboutSection
- **Purpose:** Personal context and highlight cards.

### 11. SkillsSection
- **Purpose:** Categorized skills overview.
- **Structure:** Uses semantic `<ul>` and `<li>` for skill categories and items.

### 12. ExperienceSection
- **Purpose:** Timeline/history of roles.
- **Structure:** Uses semantic `<ul>` and `<li>` for roles.

### 13. TechStackSection
- **Purpose:** Technology and tool overview.
- **Structure:** Uses semantic `<ul>` and `<li>`.

### 14. AiAutomationSection
- **Purpose:** Highlights AI-assisted workflows and automation strategy.
- **Structure:** Uses semantic `<ul>` and `<li>`.

### 15. ToolsSection
- **Purpose:** Overview of third-party ecosystem.
- **Structure:** Uses semantic `<ul>` and `<li>`.

### 16. ProjectsSection
- **Purpose:** Placeholder project portfolio.
- **Accessibility:** Unique `aria-label` for project links; hides icons.

### 17. ContactSection
- **Purpose:** Final contact area and CTA.

## Animation Wrappers (motion/)

### 18. MotionWrapper
- **Purpose:** Wrapping any element or section for consistent entry animations.
- **Reduced Motion:** Gracefully degrades animations if `prefers-reduced-motion` is detected.

## Design Notes for Codex
- Components are built with `cn()` utility for clean class management.
- Accessibility is prioritized (aria-labels, semantic HTML, large tap targets).
- Monochrome aesthetics with subtle accents (Soft Lime).

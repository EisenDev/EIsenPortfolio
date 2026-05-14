# Design System: my-portfolio (v2.0)

This document defines the premium visual principles and UI components for the my-portfolio project.

## Visual Principles
- **Editorial Minimalism:** Focus on strong typography, ample whitespace, and intentional rhythm.
- **Physical Depth:** Use of glassmorphism, layered surfaces, and subtle shadows to create a tangible UI feel.
- **Sophisticated Monochrome:** A restricted palette utilizing warm neutrals and high-contrast darks.
- **Accented Precision:** One primary accent used sparingly to guide the eye to key actions.

## Color Palette

### Light Mode (Default) - Champagne
- **Background:** `#F6F3ED` (Warm Neutral)
- **Surface:** `#FBFAF7` (Paper White)
- **Elevated Surface:** `#EEEAE2` (Muted Sand)
- **Main Text:** `#111111` (Near Black)
- **Secondary Text:** `#6F6A62` (Warm Gray)
- **Accent:** `#A68A64` (Muted Gold)
- **Border:** `#DDD7CE`

### Dark Mode - Obsidian
- **Background:** `#0D0D0C` (Deep Black)
- **Surface:** `#151514` (Dark Charcoal)
- **Elevated Surface:** `#1E1D1A` (Warm Shadow)
- **Main Text:** `#F5F2EA` (Ivory White)
- **Secondary Text:** `#B8B1A5` (Stone Gray)
- **Accent:** `#C2A66D` (Golden Bronze)
- **Border:** `#2C2A26`

## Typography
- **Primary:** Sans-serif with tight tracking and high legibility (e.g., Inter, Geist, or Geist Mono).
- **Scale:** High contrast between massive headlines (Hero) and compact labels (Badges).
- **Rhythm:** Generous line-height for body text to ensure editorial readability.

## Depth & Layering
- **Glassmorphism:** Use `.glass-panel` for navigation and floating UI elements.
- **Shadows:** Use `.editorial-shadow` sparingly for elevated cards.
- **Borders:** Subtle, low-opacity borders used to define structure without harsh lines.

## UI Elements
- **Buttons:** Rounded-sm (nearly square) for a more professional, editorial look.
- **Cards:** Clean surfaces with responsive internal padding and subtle transition effects.
- **Badges:** Multi-variant system (Default, Accent, Outline, Muted) for clear information hierarchy.

## Motion & Animation
- **Philosophy:** Subtle, sophisticated "fade-up" transitions.
- **Curves:** Premium cubic-bezier (`[0.25, 0.25, 0, 1]`) for smooth, non-linear movement.
- **Inclusive:** Full support for `prefers-reduced-motion`.

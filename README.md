# EisenPortfolio

Personal portfolio project for Arjay Escabas, focused on AI-powered applications, automation systems, auditing workflows, and full-stack product execution.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Features

- Premium dark/light portfolio interface
- Data-driven homepage sections
- Project repository links
- Generated PDF resume flow
- Responsive layout with motion polish

## Project Structure

- `src/` application code
- `public/` static assets, including the generated resume PDF
- `scripts/` utility scripts such as resume PDF generation
- `docs/` project documentation and implementation logs

## Local Development

```bash
npm install
npm run dev
```

## Production Checks

```bash
npm run lint
npm run build
```

## Resume PDF

To regenerate the resume PDF:

```bash
node scripts/generate-resume-pdf.mjs
```

## Repository

Remote: `https://github.com/EisenDev/EIsenPortfolio.git`

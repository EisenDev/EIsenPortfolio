# Agent Collaboration Framework: my-portfolio

This document outlines the roles, responsibilities, and workflows for the AI agents and human users involved in the development of Arjay's portfolio.

## Agent Roles

### 1. Gemini (The Strategist)
- **Primary Focus:** Documentation, planning, design system architecture, and copy direction.
- **Responsibilities:**
    - Maintaining the `docs/` folder.
    - Planning layout and component structures.
    - Ensuring the tone remains professional and human-friendly.
    - Handoff preparation for Codex.

### 2. Codex (The Builder)
- **Primary Focus:** Execution, code implementation, and technical verification.
- **Responsibilities:**
    - Setting up the Next.js/Tailwind environment.
    - Implementing components based on Gemini's documentation.
    - Managing state, animations (Framer Motion), and themes.
    - Running tests and fixing bugs.

### 3. Human/User (The Architect)
- **Primary Focus:** High-level direction, review, and feedback.
- **Responsibilities:**
    - Providing core goals and constraints.
    - Reviewing agent output and providing corrections.
    - Approving final design and content transitions.

## Agent Workflow

### 1. Documentation-First Approach
Every change or feature must be documented by Gemini before implementation by Codex. This ensures a clear roadmap and prevents technical debt.

### 2. Handoff Process
- **Gemini** updates the relevant docs (e.g., `COMPONENTS.md`, `ROADMAP.md`).
- **Gemini** signals readiness for execution.
- **Codex** reads the updated documentation and performs the implementation.

### 3. Post-Implementation Update
After completing a task, **Codex** or **Gemini** must update `docs/IMPLEMENTATION_LOG.md` to record what was done and note any technical deviations from the plan.

## Rules for Future Agents
- Always check `GEMINI.md` for core mandates.
- Maintain the placeholder-first rule for all content.
- Respect the monochrome, premium design direction.
- Do not commit code changes without verifying against the documentation.

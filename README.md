# Mindmap | Svelte task tracking app

## Overview

This project is aimed at diving into Svelte 5’s new reactivity model and a practical exploration of designing maintainable component architecture within a SvelteKit + TypeScript application. The task tracker itself is intentionally simple, but it serves as a focused playground for understanding how `$state`, `$derived`, snippets, stores, and component boundaries work together to make UI feel fast and predictable, while the architecture – self-documenting and scalable.

The core of the app is a state module that acts as the data layer. Instead of scattering logic across components, a single class exposes state through Svelte’s runes and reacts instantly to updates. Every change is synced with localStorage, giving the app a local-first feel without any manual persistence handling. Tasks are arranged into pre-derived groups such as all, todo, and done, which means the UI never performs filtering itself – components simply subscribe to the slices they care about, and the page becomes a straight-forward rendering layer.

On the UI side, the project uses themed shadcn-svelte primitives, together with a small set of custom components and icons for a consistent look. Svelte 5 snippets help keep reusable markup colocated with the component that uses it, keeping clear boundaries between UI primitives, composed widgets, and feature-level components.

## Features

- Add new tasks
- Mark tasks as `done` or `todo`
- Delete tasks
- Filter tasks by status
- Persist tasks locally with auto-syncing
- Switch between `light` and `dark` themes

## Future Improvements
- Multi-user support with authentication and server sync
- Drag-and-drop ordering of tasks
- Enhanced filtering (overdue, today, etc.)

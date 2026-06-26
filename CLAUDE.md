# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Student Success AI Dashboard ("SS Dashboard") — a frontend-only prototype for university student success officers to monitor AI chatbot interactions, manage at-risk students, and broadcast messages via WhatsApp.

## Tech Stack

- **No build tools** — plain HTML/CSS/JS, open `index.html` directly in a browser
- **Lucide Icons** — loaded via CDN (`unpkg.com/lucide@latest`), call `lucide.createIcons()` after DOM changes
- **Chart.js** — loaded via CDN for dashboard charts
- **Google Fonts** — Inter font family
- **No backend** — all data is mock data in `js/data.js`

## Architecture

Single-page application with client-side view routing:

```
index.html          → Shell layout (sidebar + main content area)
├── css/styles.css  → All styles, CSS variables for theming
├── js/data.js      → Mock data (students, conversations, tickets, templates, groups, KPIs, knowledge base docs)
├── js/charts.js    → Chart.js initialization (dashboard charts only)
└── js/app.js       → All view rendering and interaction logic
```

**View routing** is handled in `app.js` via a `views` object mapping view names to render functions. Navigation clicks update `viewContainer.innerHTML` and call `lucide.createIcons()`.

## Key Views (in `js/app.js`)

| View | Function | Purpose |
|------|----------|---------|
| Dashboard | `renderDashboard()` | KPI cards + charts |
| Bot Monitoring | `renderMonitoring()` | Ticket list + chat detail panel |
| Risk Center | `renderRiskCenter()` | Student risk table with filters + CSV upload |
| Templates | `renderTemplates()` | Message template CRUD |
| Broadcast | `renderBroadcast()` | Message broadcast with filter/group segmentation |
| Group Manager | `renderGroups()` | Student group CRUD |
| Feedback | `renderAnalytics()` | Feedback upload + AI summary |
| Architecture | `renderArchitecture()` | System architecture diagram |
| Knowledge Base | `renderKnowledgeBase()` | Document upload + management |

## Data Model (`js/data.js`)

All data lives in a single `mockData` object. Key entities:
- `students[]` — id, nim, name, faculty, major, semester, classType, learningMode, phone, absences, riskScore, riskLevel
- `conversations[]` — id, studentId, status, sentiment, messages[]
- `tickets[]` — id, chatId, studentId, status (open/on-progress/done), summary
- `templates[]` — id, name, content (supports `{{name}}`, `{{nim}}`, `{{semester}}` placeholders)
- `groups[]` — id, name, description, memberIds[]
- `knowledgeBaseDocs[]` — id, title, fileName, fileType, status (active/processing/error)

## Conventions

- Modals use `.modal-overlay` + `.active` class toggle pattern
- All interactive elements need `lucide.createIcons()` call after rendering
- Risk levels: Critical, High, Medium, Low (corresponding badge classes: `badge-critical`, `badge-high`, `badge-medium`, `badge-low`)
- Ticket statuses: open, on-progress, done
- Indonesian language used for all UI labels and mock data

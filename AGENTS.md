# AGENTS.md — Student Success AI Dashboard

## 30-Second TL;DR

- **No build tools.** Open `index.html` directly in a browser. Internet required for CDN-loaded Lucide, Chart.js, Google Fonts.
- **No tests, no CI, no lint.** Pure vanilla HTML/CSS/JS prototype.
- **All data is mock** in `js/data.js` — UI mutations modify the in-memory `mockData` object only.
- **SPA view routing** is a `const views = {...}` object in `js/app.js:10-19`. Navigation calls `viewContainer.innerHTML = ...` then `lucide.createIcons()`.
- **UI language: Indonesian.** All labels, mock data, and placeholders.

## Critical Gotchas

- **`lucide.createIcons()` must be called after every DOM update** (render functions, modal opens, etc.). Forgetting this = broken icons.
- **Chart.js is initialized via `window.initDashboardCharts()`** (defined in `js/charts.js`), called only inside `renderDashboard()`. Other views must not call it.
- **Global `window.*` functions** (`closeModal`, `openTemplateModal`, `closeAbsenceModal`, `openAbsenceDetail`, `closeGroupModal`, `openGroupModal`, `removeGroupMember`) are defined inside `app.js`'s `DOMContentLoaded` closure. Any new global handler must be attached to `window` inside that closure.
- **Modal pattern:** `<div class="modal-overlay">` + `.active` class toggles visibility. Three modals exist: `modal-template`, `modal-absence-detail`, `modal-group`.

## File Architecture

```
index.html          — Shell layout (sidebar + main content area)
css/styles.css      — All styles via CSS custom properties (see :root for theme tokens)
js/data.js          — mockData object: students, conversations, tickets, templates, groups, kpis, knowledgeBaseDocs
js/charts.js        — window.initDashboardCharts() for dashboard only
js/app.js           — All routing, view rendering, event handling, global functions (~1377 lines)
```

## Key Conventions

- **Risk levels:** `Critical`/`High`/`Medium`/`Low` → class `badge-{level}` (e.g. `badge-critical`)
- **Ticket statuses:** `open` / `on-progress` / `done`
- **Template placeholders:** `{{name}}`, `{{nim}}`, `{{semester}}`
- **Links to WhatsApp:** `https://wa.me/{student.phone}`
- **All interactive elements** with `data-lucide` attributes need `lucide.createIcons()` after render.

## Adding a New View

1. Add nav link in `index.html` with `data-view="my-view"`.
2. Create `renderMyView()` function in `app.js` views area.
3. Add `'my-view': renderMyView` to the `views` object.
4. Call `lucide.createIcons()` at end of render function.

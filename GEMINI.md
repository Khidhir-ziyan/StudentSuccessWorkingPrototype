# Student Success AI Dashboard (SS Dashboard)

## Project Overview

The **Student Success AI Dashboard ("SS Dashboard")** is a frontend-only prototype designed for university student success officers. It serves as a central command center to monitor AI chatbot interactions (handover from bot to human), manage at-risk students, analyze student feedback, and perform targeted communications via WhatsApp.

The dashboard aims to help staff proactively identify and intervene with students who may be struggling academically or administratively.

## Building and Running

This project is a lightweight prototype and **does not use any build tools** (no npm, webpack, or vite).

- **To Run:** Simply open `index.html` in any modern web browser.
- **Prerequisites:** An active internet connection is required to load external libraries (Lucide Icons, Chart.js, Google Fonts) via CDN.

## Tech Stack

- **Core:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Icons:** [Lucide Icons](https://lucide.dev/) (loaded via CDN)
- **Charts:** [Chart.js](https://www.chartjs.org/) (loaded via CDN)
- **Typography:** Google Fonts (Inter)
- **Data Management:** Mock data stored in `js/data.js`

## Architecture

The application is built as a **Single-Page Application (SPA)** using client-side view routing.

### Directory Structure

- `index.html`: The main shell containing the layout (sidebar and main content area).
- `css/styles.css`: Global styles and theming using CSS variables.
- `js/app.js`: The core application logic, including:
    - View routing and rendering.
    - Event handling and interactivity.
    - Global helper functions.
- `js/data.js`: Centralized storage for all mock data (students, conversations, tickets, templates, groups, KPIs, knowledge base).
- `js/charts.js`: Initialization and configuration for Chart.js instances.

### View Routing

Routing is managed in `js/app.js` via a `views` object that maps view names to specific render functions. Navigation updates the `innerHTML` of the `#view-container` element.

## Key Features

| Feature | Description |
|---------|-------------|
| **Executive Dashboard** | High-level KPIs (Total Students, Chat Volume, etc.) and visual trends via charts. |
| **Bot Monitoring** | A ticketing system to manage handovers from the AI Bot to human officers. |
| **Risk Center** | A detailed table of at-risk students with advanced filtering and direct WhatsApp integration. |
| **Templates** | Management of reusable message templates with support for personalization placeholders. |
| **Broadcast** | Tool for sending segmented mass messages to specific student groups or attributes. |
| **Group Manager** | Creation and management of student groups for better communication segmentation. |
| **Feedback & Analytics** | Analysis of student feedback through AI-generated summaries and keyword frequency. |
| **Knowledge Base** | Management of documents used to train the AI Bot. |
| **Architecture View** | Visual representation of the system's data and integration flow. |

## Development Conventions

### UI & Interaction
- **Icons:** Whenever the DOM is updated or a new view is rendered, `lucide.createIcons()` must be called to ensure icons are displayed correctly.
- **Modals:** Modals follow a standard pattern using a `.modal-overlay` element and an `.active` class for visibility.
- **Language:** The user interface and all mock data are in **Indonesian**.

### Data & State
- **Mock Data:** All application state is driven by the `mockData` object in `js/data.js`. For prototyping purposes, changes made in the UI are applied to this local object.
- **Placeholders:** Message templates support placeholders like `{{name}}`, `{{nim}}`, and `{{semester}}`.

### Styling
- **Theming:** Uses CSS variables defined in `css/styles.css` for consistent colors, spacing, and typography.
- **Badges:** Specific semantic classes are used for status and risk levels (e.g., `badge-critical`, `badge-success`, `badge-warning`).

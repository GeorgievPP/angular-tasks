# 002 – Tech Troubleshoot Hub (Angular)

A small Angular application that simulates a technical issue tracking workflow inside an organization.
The project focuses on clean architecture, predictable state management, and clear separation of concerns rather than UI styling.

---

## 🧩 Problem Overview

Employees can report technical problems which move through different stages:

1. **Preview** – newly added issues
2. **Pending** – issues currently being handled
3. **Resolved** – completed issues

Each problem includes:
- Employee name
- Category (Software / Hardware / Network)
- Urgency level
- Assigned team
- Description

Available actions:
- Add or edit a problem
- Move problems between stages
- Clear resolved problems

---

## 🛠️ Tech Stack

- Angular (Standalone Components)
- Signals & Effects
- Reactive Forms
- TypeScript
- ChangeDetectionStrategy.OnPush
- No external state management libraries

---

## 🧠 Architecture & Design Decisions

- **Smart / Container Component**
  - `TechTroubleshootHub` manages application state
  - Coordinates all interactions and data flow

- **Dumb / Presentational Components**
  - Header, form, and list components
  - Receive data via inputs and emit events via outputs

- **Centralized State**
  - `ProblemStoreService` acts as a lightweight store
  - Application state is derived using signals

- **Strong Typing**
  - Business entities modeled explicitly
  - Enums used for categories, urgency, and teams

---

## 🧩 Angular Features Used

- Standalone components
- Reactive Forms
- Dependency Injection
- Signals and effects
- Clear separation of concerns
- Typed models and services

---

## ▶️ Run the Application

From this folder run:

```bash
npm install
npm start
```

Then open in the browser:

```
http://localhost:4200
```


---

## 📁 Project Structure (simplified)

```
src/
└── app/
    ├── core/
    │   └── services/
    │       ├── problem-store.service.ts
    │       └── problem-form.service.ts
    ├── features/
    │   └── tech-troubleshoot-hub/
    │       ├── tech-troubleshoot-hub.ts
    │       ├── tech-troubleshoot-hub.html
    │       ├── tech-troubleshoot-hub.css
    │       └── components/
    │           ├── hub-header/
    │           ├── problem-form/
    │           ├── problem-preview-list/
    │           ├── problem-pending-list/
    │           └── problem-resolved-list/
    ├── models/
    │   ├── enums/
    │   │   ├── category.enum.ts
    │   │   ├── urgency.enum.ts
    │   │   └── team.enum.ts
    │   └── problem.model.ts
    └── app.config.ts
```

---

## Notes

- The UI is intentionally minimal.
- The main purpose of this project is to demonstrate:
  - Clean separation of concerns
  - Predictable state flow
  - Business-oriented naming
  - Scalable Angular project structure

This project is part of a larger Angular Tasks repository containing multiple small Angular applications focused on architecture and best practices.

---

## Possible Improvements

- Persist state using a backend or local storage
- Add routing and feature-level lazy loading
- Improve UI/UX styling
- Add unit and integration tests

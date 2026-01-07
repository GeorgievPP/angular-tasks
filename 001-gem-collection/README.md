# 001 – Gem Collection (Angular)

Small Angular application implementing the Gem Collection task, originally given as a JavaScript DOM problem, reworked and structured as a modern Angular application.

---

## 📝 Task Description

The application allows managing a gem collection with the following flow:

1. User fills a form with gem details:
   - Name
   - Color
   - Carats
   - Price
   - Type
2. On submit, the gem is shown in a preview list
3. From the preview list, the user can:
   - Edit the gem
   - Save the gem to the main collection
   - Cancel the operation
4. Saved gems are displayed in a collection list

The original task focuses on direct DOM manipulation.
This solution focuses on component-driven architecture, state management, and clean separation of concerns in Angular.

---

## 🧠 Architectural Approach

The application follows a container (smart) + presentational components pattern.

### Container Component
- GemMainComponent
- Responsible for:
  - Managing application state via services
  - Passing data to child components
  - Handling user actions (add, edit, move, remove)

### Presentational Components
- GemForm – reactive form for adding and editing gems
- GemListPreview – displays gems in preview state
- GemListCollection – displays saved gems

All components communicate using inputs, outputs, and signals, without mutating shared state directly.

---

## 🔧 State Management

State is handled via Angular services:

- GemService
  - Manages preview gems
  - Manages collection gems
  - Tracks currently edited gem
- FormService
  - Creates and configures the reactive form
  - Provides available gem types

This keeps components focused on UI logic and makes the state predictable and testable.

---

## 📦 Models

Strong typing is enforced using models and types located in the models folder, including:
- Gem
- Supporting type definitions

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
 ├── app/
 │   ├── core/
 │   │   └── services/
 │   ├── features/
 │   │   └── components/
 │   │   │   ├── gem-form/
 │   │   │   ├── gem-list-preview/
 │   │   │   ├── gem-list-collection/
 │   │   └── gem-main-component/
 │   ├── models/
 │   └── app.config.ts
```

---

## 📌 Notes

This project is part of the Angular Tasks repository, which contains multiple small Angular applications solving different tasks, each implemented with clean architecture and best practices in mind.

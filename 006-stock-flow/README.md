# 006 – Stock Flow (Angular)

Angular application demonstrating CRUD operations with server communication, state management, and clean separation of concerns.

This project communicates with a JSON Server backend and is part of the Angular Tasks collection.

---

## 🧩 Problem Overview

This application represents a simplified **order / inventory flow system**, inspired by stock-based workflows.

Orders are loaded from a backend API and managed through a centralized store service.

Each order contains:
- Stock name
- Quantity
- Date
- Unique identifier

The application supports the following operations:
- Load orders from a REST API
- Create new orders
- Edit existing orders
- Delete orders

The state of the application is managed using a dedicated **store service** based on `BehaviorSubject`, while all HTTP communication is isolated in a separate **API service**.

This separation ensures:
- Clear responsibility boundaries
- Predictable state management
- Easy refactoring and scalability

---

## 🏗️ Architecture

The application follows a layered architecture:

- API layer – responsible only for HTTP communication
- Store layer – responsible for client-side state management
- Presentational components – UI-only, no business logic
- Feature container – orchestrates services and components

---

## 🔌 Services Overview

### OrderApiService
Handles only HTTP communication:
- load orders
- create order
- update order
- delete order

No state is stored in this service.

---

### OrderStoreService
Responsible for:
- holding application state
- exposing observables to components
- coordinating API calls
- managing editing state

Uses BehaviorSubject for predictable and explicit state handling.

---

### OrderFormService
Responsible for:
- creating and configuring reactive forms
- keeping form-related logic outside of components

---

## ▶️ Run the Application

### 1. Start JSON Server

```bash
cd server
node server.js
```

---

### 2. Run Angular App

```bash
npm install  
npm start
```

Then open in the browser:

```
http://localhost:4200
```

---

## 📂 Project Structure (simplified)

```
src/
 └─ app/
    ├─ core/
    │  ├─ constants/
    │  │  └─ api.config.ts
    │  └─ services/
    │     ├─ order-api.service.ts
    │     ├─ order-form.service.ts
    │     └─ order-store.service.ts
    │
    ├─ features/
    │  ├─ components/
    │  │  ├─ order-form/
    │  │  └─ order-list/
    │  └─ stock-flow/
    │     ├─ stock-flow.ts
    │     ├─ stock-flow.html
    │     └─ stock-flow.css
    │
    ├─ models/
    │  └─ order.model.ts
    │
    ├─ app.routes.ts
    ├─ app.config.ts
    └─ app.ts
```


---

## 🧩 Tech Stock

- Angular (standalone components)
- TypeScript
- RxJS
- HttpClient
- JSON Server
- Reactive Forms

---

## 🎯 Project Goals

- demonstrate Angular structure
- separate API and state management logic
- keep components clean and focused
- build scalable and maintainable architecture

---

## 📌 Notes

This project is part of the Angular Tasks repository.

Future improvements may include:
- loading and error state handling
- optimistic UI updates
- refactoring store logic with signals
- enhanced typing for API responses

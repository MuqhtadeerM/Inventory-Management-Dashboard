# Coca Cola Inventory Management System

This is a **Role-Based Inventory Management System** designed for Coca-Cola, featuring a modern frontend built with React. The application supports three distinct user roles — **Admin**, **Manager**, and **Sales User** — each with tailored access controls and features.
  
## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Roles & Permissions](#roles--permissions)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Role-Based Authentication & Authorization**:  
  - Admin: Manages users, inventory, access controls.
  - Manager: Oversees inventory, generates reports.
  - Sales User: Views inventory, creates sales orders.
- **Inventory Tracking**: Add, update, and manage product inventory.
- **Responsive & Modern UI**: Built with TailwindCSS for mobile-friendly operation.
- **Context-based State Management**: Centralized state for user sessions and inventory.
- **Navigation**: Intuitive routing across modules with React Router.
- **Developer Tooling**:  
  - Prettier for code formatting  
  - Husky for git hooks (pre-commit/pre-push to enforce code style)
  
## Tech Stack

- **React**  
- **Context API**
- **React Router**
- **TailwindCSS**
- **JavaScript (ES6+)**
- **Prettier**  
- **Husky**

---

## Getting Started

### Prerequisites

Be sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/coca-cola-inventory.git
   cd coca-cola-inventory
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   The app should now be running at `http://localhost:3000`

---

## Available Scripts

- `start` — Start development server
- `build` — Production build
- `test` — Run tests
- `lint` — Lint JS files
- `format` — Format code with Prettier

Husky hooks automatically lint and format the code before each commit.

---

## Project Structure

```
src/
  ├─ components/
  ├─ contexts/
  ├─ pages/
  ├─ routes/
  ├─ utils/
  ├─ App.js
  ├─ index.js
  └─ ...
```

---

## Roles & Permissions

| Role        | Inventory Management | User Management | Report Generation | Sales Orders |
|-------------|:-------------------:|:--------------:|:----------------:|:------------:|
| Admin       | ✅                  | ✅             | ✅               | ✅            |
| Manager     | ✅                  | ❌             | ✅               | ❌           |
| Sales User  | View Only           | ❌             | ❌               | ✅           |

Access is managed via React Context and checked at route level using React Router.

---

## Contributing

Pull requests are welcome!  
Ensure code is formatted and passes all lint checks — Husky and Prettier will run automatically.

---

## License

[MIT](LICENSE)

---

**Made with ❤️ by MuqhtadeerM**

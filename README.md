# Kayora

**Kayora** is a modern furniture e-commerce frontend built with **Vue 3** and **Vite**. The project is designed to showcase a clean, responsive, and user-friendly shopping interface for discovering furniture products.

This project currently focuses on the **frontend experience** and uses **dummy data** to simulate product information and user interactions. Backend services, database integration, authentication, and payment processing are not yet implemented.

> **Project Status:** Frontend Development

---

## Overview

Kayora is a frontend web application concept for a modern furniture brand.

The project focuses on translating a furniture e-commerce design into a functional web interface using Vue 3. It demonstrates the implementation of reusable components, responsive layouts, navigation, product presentation, and interactive UI elements.

At its current stage, all product and catalog information is provided through **static/dummy data**. The application does not yet communicate with a backend server or database.

---

## Features

### Product Catalog

Displays furniture products using structured dummy data, allowing users to explore available products through the catalog.

### Product Categories

Furniture products are organized into categories to make product discovery easier.

### Search Interface

Provides a frontend search experience for finding products within the catalog.

### Wishlist Interface

Allows users to interact with wishlist functionality on the frontend.

### Shopping Cart Interface

Provides a shopping cart experience for managing selected products on the client side.

### Featured Products

Highlights selected furniture products on the website's main sections.

### Responsive Design

The interface is designed to adapt to desktop, tablet, and mobile screen sizes.

### Client-Side Navigation

Uses Vue Router to provide navigation between different pages and sections of the application.

---

## Tech Stack

| Technology       | Purpose                           |
| ---------------- | --------------------------------- |
| **Vue 3**        | Frontend framework                |
| **Vite**         | Development server and build tool |
| **JavaScript**   | Application logic                 |
| **HTML5**        | Page structure                    |
| **CSS3**         | Styling and responsive design     |
| **Vue Router**   | Client-side routing               |
| **Lucide Icons** | UI icons                          |

---

## Data Architecture

Currently, Kayora does **not use a backend or database**.

Product information and other content displayed throughout the application are provided using **dummy/static data** on the frontend.

```text
User
  │
  ▼
Vue 3 Application
  │
  ├── Components
  ├── Views
  ├── Vue Router
  └── Dummy Data
```

The current architecture is intentionally frontend-focused and can later be extended by replacing the dummy data with data retrieved from a backend API.

---

## Project Structure

```text
Kayora/
├── public/
│   └── assets/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── App.vue
│   └── main.js
│
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

The project follows a component-based structure to keep the interface organized and make individual UI elements easier to maintain and reuse.

---

## Getting Started

### Prerequisites

Make sure the following tools are installed:

* Node.js
* npm
* Git

Check the installed versions:

```bash
node --version
npm --version
git --version
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Ardan2008/Kayora.git
```

Navigate to the project directory:

```bash
cd Kayora
```

Install dependencies:

```bash
npm install
```

---

## Development

Run the development server:

```bash
npm run dev
```

Vite will provide a local development URL that can be opened in your browser.

The project supports **Hot Module Replacement (HMR)**, allowing changes to the source code to appear immediately during development.

---

## Production Build

Create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Current Limitations

Since Kayora is currently a frontend project, several features are not yet connected to a real backend system:

* No backend API
* No database
* No user authentication
* No persistent user accounts
* No persistent shopping cart
* No persistent wishlist
* No real checkout process
* No payment gateway
* Product data is still based on dummy data

These limitations are part of the current development stage and provide opportunities for future expansion.

---

## Future Development

The next development phase could include:

1. **Backend API**

   * Build REST API for products, categories, users, carts, and orders.

2. **Database**

   * Store products, users, orders, and other application data in a database.

3. **Authentication**

   * Add user registration, login, and account management.

4. **Persistent Cart & Wishlist**

   * Store user-specific cart and wishlist data.

5. **Checkout**

   * Implement order creation and checkout functionality.

6. **Payment Integration**

   * Connect the application with a payment gateway.

7. **Admin Dashboard**

   * Provide product, inventory, user, and order management.

---

## Development Goals

Kayora was developed as a practical frontend project to improve experience in:

* Vue 3
* Component-based architecture
* Responsive web development
* UI/UX implementation
* Client-side routing
* JavaScript development
* Frontend project organization
* Building realistic e-commerce interfaces

---

## Project Information

| Information     | Details                       |
| --------------- | ----------------------------- |
| **Project**     | Kayora                        |
| **Type**        | Furniture E-Commerce Frontend |
| **Framework**   | Vue 3                         |
| **Build Tool**  | Vite                          |
| **Data Source** | Dummy / Static Data           |
| **Backend**     | Not Implemented               |
| **Database**    | Not Implemented               |
| **Status**      | Frontend Development          |

---

## Repository

The source code is available on GitHub:

**https://github.com/Ardan2008/Kayora**

---

## Author

**Ardan Ramadhan**

Full-Stack Developer & Web Development

Focused on frontend development, modern web technologies, and building clean and user-centered web interfaces.

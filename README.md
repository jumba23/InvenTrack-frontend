# InvenTrack Frontend

This is a [Next.js](https://nextjs.org/) project utilizing **Next.js 14.2.7**.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Key Features](#key-features)
4. [Application Architecture](#application-architecture)
5. [State Management](#state-management)
6. [Authentication](#authentication)
7. [API Integration](#api-integration)
8. [Error Handling](#error-handling)
9. [Development Practices](#development-practices)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Future Plans](#future-plans)

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

The project follows the Next.js 14.2.7 folder structure and uses a modular approach for better maintainability:

```
frontend/
├── app/
│   ├── dashboard/
│   │    ├── layout.jsx
│   │    └── page.jsx
│   ├── inventory/
│   │    ├── new-product/
│   │    │   └── page.jsx                         // Add new product page
│   │    ├── product/
│   │    │    └── [id]/
│   │    │        └── page.jsx                    // Edit product page
│   │    ├── infoCards.jsx
│   │    ├── layout.jsx
│   │    └── page.jsx                             // Main inventory page
│   ├── orders/
│   │    └── page.jsx
│   ├── reports/
│   │    └── page.jsx
│   ├── suppliers/
│   │    ├── new-supplier/
│   │    │   └── page.jsx                         // Add new supplier page
│   │    ├── supplier/
│   │    │    └── [id]/
│   │    │        └── page.jsx                    // Edit supplier page
│   │    ├── layout.jsx
│   │    └── page.jsx                             // Main suppliers page
│   ├── user/
│   │   ├── login/
│   │   │    └── page.jsx                        // Login page
│   │   └── signup/
│   │        └── page.jsx                        // Signup page
│   ├── favicon.ico
│   ├── globals.css
│   ├── not-found.jsx
│   ├── error.jsx
│   ├── SkeletonScreen.jsx
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── AccountSettings/
│   │   ├── SettingsDialog.jsx                   // Dialog for updating user settings
│   │   └── AccountMenu.jsx                      // Dropdown menu for user account actions
│   ├── Buttons/
│   │   ├── CancelButton.jsx                     // Cancel button with consistent styling
│   │   └── SubmitButton.jsx                     // Submit button with consistent styling
│   ├── Dashboard/
│   │   ├── InfoCard.jsx
│   │   ├── InventoryOverview.jsx
│   │   ├── ProductAlerts.jsx
│   │   ├── QuickActions.jsx
│   │   ├── RecentActivity.jsx
│   │   └── KPIGrid.jsx
│   ├── Forms/
│   │   ├── OrderForm/
│   │   │   ├── index.js
│   │   │   └── OrderFormComponent.jsx
│   │   ├── ProductForm/
│   │   │   ├── index.js                         // Main entry point for the form
│   │   │   ├── ProductFormComponent.jsx         // Full form component
│   │   │   ├── FormField.jsx                    // Individual input fields (name, price, etc.)
│   │   │   ├── FormActions.jsx                  // Form buttons (Submit, Cancel)
│   │   │   └── FormSection.jsx                  // Wrapper for logical form sections (details, pricing)
│   │   └── SupplierForm/
│   │       ├── FormActions.jsx                  // Form buttons (Submit, Cancel)
│   │       ├── FormField.jsx                    // Individual input fields (name, contact, etc.)
│   │       ├── FormSection.jsx                  // Wrapper for logical form sections (details, address)
│   │       ├── index.js                         // Main entry point for the form
│   │       └── SupplierFormComponent.jsx        // Full form component
│   ├── Inventory/
│   │   ├── Filters/
│   │   │   └── CategoryFilter.jsx               // Filter by product category (service or retail)
│   │   ├── Modals/
│   │   │   └── DeleteConfirmationDialog.jsx     // Confirmation dialog for deleting products
│   │   ├── ProductCard/
│   │   │   └── ProductCard.jsx                  // Individual product card
│   │   └── ProductList/
│   │       ├── ProductCardList.jsx              // List of product cards - For mobile view
│   │       └── ProductDataGrid.jsx              // Data grid for displaying product information - For desktop view
│   ├── LandingPageComponents/
│   │   ├── LandingPageHeader.jsx
│   │   └── LandingMain.jsx
│   ├── MainPageComponents/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── Modals/
│   │   ├── ConfirmationDialog.jsx              // Generic confirmation dialog
│   │   └── LogoutModal.jsx                     // Modal for logging out
│   ├── Notifications/
│   │   └── NotificationSnackbar.jsx            // Snackbar for displaying notifications
│   ├── Spinners/
│   │   ├── Spinner.jsx
│   │   └── LogoSpinner.jsx
│   ├── Suppliers/
│   │   ├── Modals/
│   │   │   └── SupplierDeleteConfirmationDialog.jsx
│   │   ├── SupplierCard/
│   │   │   └── SupplierCard.jsx
│   │   └── SupplierList/
│   │       ├── SupplierCardList.jsx
│   │       └── SupplierDataGrid.jsx
│   └── ZustandInitializers/
│       ├── ProductInitializer.js             // Initialize product store
│       ├── SupplierInitializer.js            // Initialize supplier store
│       └── ProfileInitializer.js             // Initialize profile store
├── context/
│   └── AuthContext.jsx                       // Authentication context provider
├── layouts/
│   ├── LandingPageLayout.jsx                 // Layout for the landing page - Unauthenticated users
│   ├── PageLayout.jsx                        // Layout for authenticated users - passing MainLayout as children
│   └── MainLayout.jsx                        // Main layout for the application
├── public/
│   └── images/
├── stores/
│   ├── supplierStore.js                      // Setting up supplier store with Zustand
│   ├── productStore.js                       // Setting up product store with Zustand
│   └── profileStore.js                       // Setting up profile store with Zustand
├── utils/
│   ├── api/
│   │   ├── authService.js                    // Authentication service
│   │   ├── productService.js                 // Product service CRUD operations
│   │   ├── profileService.js                 // Profile service CRUD operations
│   │   ├── supplierService.js                // Supplier service CRUD operations
│   │   ├── axiosClient.js                    // Axios client configuration
│   │   └── errorHandling.js                  // Error handling module
│   ├── errorTypes.js                         // Error types for consistent error handling
│   ├── hooks/
│   │   ├── Errors/
│   │   │   ├── index.js
│   │   │   ├── useAuthError.js               // Custom hook for handling authentication errors
│   │   │   └── useError.js                   // Custom hook for handling API errors
│   │   ├── useProduct.js                     // Custom hook for zustand product store
│   │   ├── useSupplier.js                    // Custom hook for zustand supplier store
│   │   └── useProfile.js                     // Custom hook for zustand profile store
│   └── RouteGuard.js                         // Route guard for protected routes
├── .env.local
├── .eslintrc.json
├── next.config.js
├── package.json
├── jsconfig.json
├── postcss.config.js
└── tailwind.config.js
```

### Key Directories and Files

- `app/`: Contains Next.js pages and routing structure.
- `components/`: Reusable React components.
  - **Buttons**: Houses the styled `CancelButton.jsx` and `SubmitButton.jsx` with consistent sizing and styling.
  - **Forms**: Contains reusable form components for various actions such as `OrderForm`, `ProductForm`, and `SupplierForm`.
  - **Inventory**: Handles inventory-specific components, like product filtering, product cards, and product data grids.
- `context/`: React Context providers for authentication state management.
- `stores/`: Zustand stores for global state management.
- `layouts/`: Custom layout components.
- `utils/`: Utility functions, API services, and custom hooks.
- `public/`: Static assets like images.
- `zustandInitializers/`: Initialization of Zustand stores for products, suppliers, and profiles.

## Key Features

1. **Inventory Management**: Track and manage product inventory.
2. **Order Processing**: Handle and process customer orders.
3. **Supplier Management**: Manage supplier information and orders.
4. **Reporting**: Generate and view various business reports.
5. **User Authentication**: Secure login, signup, and route protection.

## Application Architecture

- **Framework**: Next.js 14.2.7
- **Language**: JavaScript (with plans to migrate to TypeScript)
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **API Client**: Axios
- **Form Handling**: React Hook Form
- **Authentication**: Custom implementation using session cookies set by a Node.js server
- **Modular Services**: Separate service modules for authentication, product, and profile management

## State Management

### Zustand

Zustand is used for global state management, particularly for handling product and profile data. It offers a simple and performant alternative to the React Context API, using hooks to access and manipulate state.

#### Stores

- **Product Store (`productStore.js`)**: Manages the state related to products in the inventory.
- **Profile Store (`profileStore.js`)**: Manages the state related to user profiles.
- **Supplier Store (`supplierStore.js`)**: Manages the state related to suppliers.

#### Custom Hooks

- `useProduct.js`: Provides access to the product store and manages product data loading.
- `useProfile.js`: Provides access to the profile store and manages profile data loading.
- `supplierStore.js`: Provides access to the supplier store and manages profile data loading.

### Authentication State

Authentication state is managed using the React Context API in `AuthContext.jsx`. This context provides functions for login, logout, and authentication checks, and works in tandem with Zustand stores.

## Authentication

### Overview

The application implements a JWT-based authentication system with session cookies:

- \*\*Initial Check

\*\*: On app mount, `AuthProvider` validates the user token by making a request to the backend.

- **Token Validation**: The backend verifies the JWT stored in HTTP-only cookies.
- **Login Process**:
  - The frontend sends login credentials to the backend.
  - The backend authenticates the user, generates a JWT, and sets it in an HTTP-only cookie.
  - The frontend updates the authentication state accordingly.
- **Subsequent Requests**: The JWT is automatically sent with each request due to the cookie.
- **Logout**: Clears the JWT cookie and resets the authentication state.

### Security Measures

- **HTTP-only Cookies**: JWTs are stored in cookies that are not accessible via JavaScript, mitigating XSS attacks.
- **Server-side Validation**: All JWTs are validated on the server to protect against tampering.
- **Secure Cookie Settings**: Cookies are configured with secure attributes like `Secure` and `SameSite`.
- **Email Confirmation**: Users are required to confirm their email addresses during signup.

## API Integration

The application uses Axios for API calls, with a modular approach where different services handle specific responsibilities.

### Modular Services

- **Authentication Service (`authService.js`)**: Handles all authentication-related API calls.
- **Product Service (`productService.js`)**: Handles all product-related API calls.
- **Profile Service (`profileService.js`)**: Handles all profile-related API calls.
- **Supplier Service (`supplierService.js`)**: Handles all supplier-related API calls.

### Axios Client Configuration

All API requests are made using a centralized Axios client configured in `axiosClient.js`. This client is set up with a base URL pointing to the backend API and includes credentials in every request.

```javascript
// utils/api/axiosClient.js
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosClient;
```

## Error Handling

A consistent error handling mechanism is implemented across all API calls, utilizing custom hooks and utility functions.

### Error Handling Module (`errorHandling.js`)

Provides utility functions for handling API errors in a consistent manner, with special handling for authentication errors.

### Custom Hooks for Error Handling

- **`useAuthError.js`**: A custom hook for handling authentication-related errors.

## Development Practices

1. **State Management**: Utilizes React Context API and Zustand for global state management.
2. **API Integration**: Axios is used for API calls, with a modular service approach in `utils/api/`.
3. **Routing**: Leverages Next.js App Router for file-system-based routing.
4. **Styling**: Uses Tailwind CSS for styling.
5. **Code Quality**: ESLint is used for maintaining code quality.
6. **Error Handling**: Implements a consistent error handling mechanism across the application.

## Testing

A comprehensive testing strategy is planned to ensure application reliability:

1. **Unit Tests**: For utility functions, store actions, and custom hooks.
2. **Component Tests**: Using React Testing Library to test individual components and their interactions with stores.
3. **Integration Tests**: To verify interactions between different parts of the application, including state management with Zustand.
4. **End-to-End Tests**: Using tools like Cypress to simulate user workflows.

## Deployment

- **Hosting**: Plans to use Vercel for seamless deployment, leveraging its integration with Next.js.
- **Environment Management**: Proper handling of environment variables in different deployment stages.
- **CI/CD Pipelines**: Setting up continuous integration and deployment pipelines for automated testing and deployment.
- **Monitoring**: Implementing monitoring and error tracking using tools like Sentry.

## Future Plans

1. **TypeScript Migration**: Gradually convert the codebase to TypeScript for improved type safety and developer experience.
2. **Regular Updates**: Keep dependencies up to date to benefit from the latest features and security patches.
3. **Component Library**: Consider extracting common UI components into a shared library for consistency and reusability.
4. **Performance Audits**: Regularly perform performance audits to identify and fix bottlenecks.
5. **Feature Expansion**: Expand the application's capabilities, such as adding more detailed reporting or advanced inventory analytics.
6. **State Management Enhancements**: Explore the use of selectors in Zustand to optimize performance and potentially split stores for better scalability.

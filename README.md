# InvenTrack Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), utilizing Next.js 14.2.7.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Key Features](#key-features)
4. [Authentication](#authentication)
5. [Development Practices](#development-practices)
6. [Testing](#testing)
7. [Deployment](#deployment)

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application currently redirects to the `/inventory` page by default.

## Project Structure

This project follows the Next.js 14.2.7 folder structure:

```
frontend/
├── app/
│   ├── dashboard/
│   │    └──page.jsx
│   ├── inventory/
│   │    └──page.jsx
│   ├── orders/
│   │    └──page.jsx
│   ├── reports/
│   │    └──page.jsx
│   ├── suppliers/
│   │    └──page.jsx
│   ├── user/
│   │   ├── login/
│   │   │    └──page.jsx
│   │   └── signup/
│   │        └──page.jsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── SkeletonScreen.jsx
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── AccountSettings/
│   │    └──AccountMenu.jsx
│   ├── Forms/
│   │   ├── OrderForm.jsx
│   │   ├── ProductForm.jsx
│   │   └── SupplierForm.jsx
│   ├── LandingPage/
│   │   ├── LandingPageHeader.jsx
│   │   └── LandingMain.jsx
│   ├── Modals/
│   │   └── LogoutModal.jsx
│   ├── Spinners/
│   │   ├── Spinner.jsx
│   │   └── LogoSpinner.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Sidebar.jsx
├── context/
│   ├── AuthContext.jsx
│   └── ProductContext.jsx
├── layouts/
│   ├── LandingPageLayout.jsx
│   └── MainLayout.jsx
├── public/
│   └── images/
├── utils/
│   ├── api/
│   │   ├── apiService.js
│   │   ├── axiosClient.js
│   │   └── errorHandling.js
│   ├── hooks/
│   │    └── useRequireAuth.js
│   └──RouteGuard.js
├── .env.local
├── .eslintrc.json
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

### Key Directories and Files

- `app/`: Contains Next.js 14.2.7 pages and routing structure.
- `components/`: Reusable React components.
- `context/`: React Context providers for state management.
- `layouts/`: Custom layout components.
- `utils/`: Utility functions, API services, and custom hooks.
- `public/`: Static assets.

## Key Features

1. **Inventory Management**: Track and manage product inventory.
2. **Order Processing**: Handle and process customer orders.
3. **Supplier Management**: Manage supplier information and orders.
4. **Reporting**: Generate and view various business reports.
5. **User** Authentication: Secure login, signup, and route protection.

## Authentication

Utilizes Supabase for backend authentication.
Frontend stores authentication token in HTTP Cookies.
Protected routes are managed by the RouteGuard component.

Authentication flow:

1. User submits credentials.
2. Frontend sends request to backend API.
3. Backend authenticates with Supabase and returns a token.
4. Frontend stores the token and uses it for subsequent requests.

## Development Practices

1. **State Management**: Utilizes React Context API (see `context/` directory).
2. **API Integration**: Axios is used for API calls, with a centralized service in `utils/api/apiService.jsx`.
3. **Routing**: Leverages Next.js 14.2.7 App Router for file-system based routing.
4. **Styling**: Uses Tailwind CSS for styling (see `tailwind.config.js` and `postcss.config.js`).
5. **Code Quality**: ESLint is used for maintaining code quality (see `.eslintrc.json`).

## Testing

(Add information about your testing strategy and how to run tests once implemented)

## Deployment

(Add information about your deployment process and any relevant instructions)

## Future Plans

1. Migrate from JavaScript to TypeScript for improved type safety and developer experience.
2. Implement comprehensive testing suite.
3. Enhance security measures for token storage and management.
4. Regularly update dependencies to leverage latest features and security patches.

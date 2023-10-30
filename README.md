This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Folder and File structure (This folder follows the Next 13.5 folder structure)

- app/

  - page.js: Default Home page. \*\*\* currently re-routes to /inventory
  - dashboard/
    - page.js: Dashboard page.
  - inventory/
    - page.js: Inventory page.
  - user/
    - signup/
      - page.js: Sign Up form.
    - login/
      - page.js: Login form.
  - page.js: app entry point file.
  - global.css: Tailwind styles.
  - components/
    - Forms/
      - LoginForm.js: Login form.
      - SignUpForm.js: Sign Up form.
      - AddProductsForm.js: Form to add a new product
      - AddSupplierFrom.js: Form to add a new supplier
    - LandingPage/
      - landingHeader.js: Header structure with "Sign up" and "Login" buttons.
      - landingMain.js: Page with images and tex about the application.
    - Footer.js: Footer style and structure
    - Header.js: Header style and structure
    - Sidebar.js: Sidebar style and structure

- layouts/
  - MainLayout.js: Layout for pages like Inventory, Reports, Suppliers, Orders.
  - LandingPageLayout.js: Layout page will render if there is no "token" in localStorage .
- utils/

  - api/
    - axiosClient.js: Base URL for server - AXIOS.
    - apiService.js: Authentication, Products and Suppliers related functions.
  - hooks/ - useRedirectToInventory - TEMP re-routing to/inventory/pages.js

- public/

  - images/: Images like splash image.

```

**Explanation:**

- **app/**: This is where Next.js 13.5 specific routing, pages, layouts, and templates are defined.
- **components/**: Common reusable components. page.js is the entry point to the app.
- **layouts/**: Custom layout files, if needed outside Next.js 13's built-in layout system.
- **utils/** or **services/**: Functions related to API calls, authentication, utility functions, etc.
- **public/**: For static assets like images, fonts, etc. They are served as-is and accessible via root URL.
- **__tests__/**: Test files for the application components and pages.

###AUTHENTICATION

supabase package is used for authentication on the backend app(server). The frontend app only passes the user parameters
```

```

```

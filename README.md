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

## File structure

- app/

  - page.js: Default Home page. \*\*\* currently re-routes to /inventory
  - dashboard/
    - page.js: Dashboard page.
    - layout.js: Layout for dashboard.
  - inventory/
    - page.js: Inventory page.
  - layout.js: Root layout.
  - global.css: Tailwind styles.

- components/

  - Header.js
  - Footer.js
  - Sidebar.js
  - Form/
    - InventoryForm.js
    - SupplierForm.js

- layouts/

  - MainLayout.js: Layout for pages like Inventory, Reports, Suppliers, Orders.

- utils/

  - hooks/ - useRedirectToInventory - TEMP re-routing to/inventory/pages.js
  - auth.js: Authentication-related functions.
  - api.js: Functions for API calls.

- public/

  - images/: Images like splash image.

- **tests**/
  - components/: Tests for your components.
  - pages/: Tests for your pages.

```

**Explanation:**

- **app/**: This is where Next.js 13 specific routing, pages, layouts, and templates are defined.
- **components/**: Common reusable components.
- **layouts/**: Custom layout files, if needed outside Next.js 13's built-in layout system.
- **utils/** or **services/**: Functions related to API calls, authentication, utility functions, etc.
- **public/**: For static assets like images, fonts, etc. They are served as-is and accessible via root URL.
- **__tests__/**: Test files for the application components and pages.




```

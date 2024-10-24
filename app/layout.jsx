//app/layout.jsx

import { AuthProvider } from "@/context/AuthContext";
import { RouteGuard } from "@/utils/RouteGuard";
import ProfileInitializer from "@/components/ZustandInitializers/ProfileInitializer";
import ProductInitializer from "@/components/ZustandInitializers/ProductInitializer";
import SupplierInitializer from "@/components/ZustandInitializers/SupplierInitializer";
import "./globals.css";

// Metadata for the application.
export const metadata = {
  title: "InvenTrack",
  description: "Inventory Tracking System",
  keywords: "inventory, tracking, management, supplies",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
};

/**
 * ======================================== SUMMARY ========================================
 * RootLayout serves as the foundational layout component for the InvenTrack application
 * built with Next.js 14. It integrates AuthProvider, RouteGuard, and Zustand store
 * initializers to ensure authentication, routing protection, and state management
 * are available throughout the application.
 *
 * Functionality:
 * - Utilizes Next.js 14's app router and layout system.
 * - Wraps child components with AuthProvider for authentication context.
 * - Implements RouteGuard for protected routing.
 * - Initializes Zustand stores for profile and product data management.
 * - Defines the root HTML structure, ensuring a consistent layout across all pages.
 * - Applies global styles through the import of globals.css.
 *
 * Key Next.js 14 Features Used:
 * - App Router: This layout is part of the app directory structure.
 * - Metadata API: Uses the metadata export for SEO optimization.
 * - Server Components: By default, this is a Server Component unless explicitly set to "use client".
 *
 * State Management:
 * - Uses Zustand for managing profile and product states, replacing the previous Context-based approach.
 * - ProfileInitializer and ProductInitializer components ensure proper client-side initialization of Zustand stores.
 *
 * Usage:
 * - Serves as the top-level layout in the Next.js 14 app directory structure.
 * - Ensures authentication, routing protection, and state management are accessible throughout the app,
 *   facilitating a seamless user experience.
 *
 * Note:
 * - This layout remains a Server Component. The Zustand store initializers are client components
 *   to handle client-side state management.
 * - If any additional client-side functionality is needed in this layout, consider adding "use client"
 *   at the top of the file and handling any server/client differences appropriately.
 *
 * ===========================================================================================
 */

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <RouteGuard>
            <ZustandProviders>{children}</ZustandProviders>
          </RouteGuard>
        </AuthProvider>
      </body>
    </html>
  );
}

const ZustandProviders = ({ children }) => (
  <ProfileInitializer>
    <SupplierInitializer>
      <ProductInitializer>{children}</ProductInitializer>
    </SupplierInitializer>
  </ProfileInitializer>
);

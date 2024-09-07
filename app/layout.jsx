import { ProductProvider } from "@/context/ProductContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { RouteGuard } from "@/utils/RouteGuard";

// Metadata for the application.
export const metadata = {
  title: "InvenTrack",
  description: "Inventory Tracking System",
};

/**
 * ======================================== SUMMARY ========================================
 * RootLayout serves as the foundational layout component for the InvenTrack application
 * built with Next.js 14. It integrates AuthProvider and ProductProvider to ensure
 * authentication and product contexts are available throughout the application.
 *
 * Functionality:
 * - Utilizes Next.js 14's app router and layout system.
 * - Wraps child components with AuthProvider and ProductProvider, providing access to
 *   authentication and product-related state and functions.
 * - Defines the root HTML structure, ensuring a consistent layout across all pages.
 * - Applies global styles through the import of globals.css.
 *
 * Key Next.js 14 Features Used:
 * - App Router: This layout is part of the app directory structure.
 * - Metadata API: Uses the metadata export for SEO optimization.
 * - Server Components: By default, this is a Server Component unless explicitly set to "use client".
 *
 * Usage:
 * - Serves as the top-level layout in the Next.js 14 app directory structure.
 * - Ensures authentication and product states are accessible throughout the app,
 *   facilitating a seamless user experience.
 *
 * Note:
 * - If any client-side functionality is needed in this layout, consider adding "use client"
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
            <ProductProvider>{children}</ProductProvider>
          </RouteGuard>
        </AuthProvider>
      </body>
    </html>
  );
}

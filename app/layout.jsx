import { AuthProvider } from "../context/AuthContext"; // Ensure this path is correct
import "./globals.css";

// Metadata for the application.
export const metadata = {
  title: "InvenTrack",
  description: "Inventory Tracking System",
};

/** ======================================== SUMMARY ========================================
 * RootLayout serves as the foundational layout component for the InvenTrack application, integrating
 * the AuthProvider to ensure authentication context is available throughout the application. It provides
 * a consistent structural foundation for the pages of the application, encapsulating children components
 * within the global authentication context established by AuthProvider.
 *
 * Functionality:
 * - Wraps child components with the AuthProvider, granting them access to authentication-related state
 *   and functions. This enables components deep in the component tree to react to changes in authentication state.
 * - Defines the root HTML structure with a consistent layout for different pages, facilitating a cohesive look and feel.
 *
 * Usage:
 * - Employed at the top level of the application's component hierarchy, typically within the custom App component
 *   in Next.js or as part of the `app` directory's layout pattern, to wrap page content.
 * - By using AuthProvider at this level, it ensures that authentication state is universally accessible,
 *   providing a seamless experience for authenticated user interactions across the entire application.
 *
 * This setup is integral for maintaining a secure and user-responsive application, as it manages user
 * authentication state centrally and efficiently.
 *  ===================================================================================================*/

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}

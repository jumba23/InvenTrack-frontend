/**
 * This Higher-Order Component (HOC) is designed to manage route protection based on the user's authentication status.
 * It leverages the global authentication context to determine if a user is authenticated and
 * redirects users based on their authentication status.
 *
 * Functionality:
 * - If the user's authentication status is not yet determined (loading is true),
 *   it attempts to validate the user's session/token.
 * - If the user is authenticated (isAuthenticated is true), and they are not on the `redirectUrl`,
 *   they are optionally redirected to a specified URL (e.g., a dashboard page).
 * - If the user is not authenticated (isAuthenticated is false), they are redirected to the login page.
 * - During the authentication check, a loading state is displayed.
 *
 * This HOC ensures that certain parts of the application are accessible only to authenticated users
 * and helps in redirecting users to appropriate pages based on their authentication status.
 *
 * Usage:
 * Wrap your component with this HOC to protect it:
 * export default useRequireAuth()(YourProtectedComponent);
 *
 * You can also specify a custom redirect URL:
 * export default useRequireAuth("/custom-redirect")(YourProtectedComponent);
 *
 * @param {string} redirectUrl - The URL to redirect authenticated users to. Defaults to "/dashboard".
 * @returns {function} A Higher-Order Component that wraps the provided component with authentication logic.
 */

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import { validateUser } from "@/utils/api/apiService";

// export const useRequireAuth = (redirectUrl = "/dashboard") => {
//   return (WrappedComponent) => {
//     return (props) => {
//       const router = useRouter();
//       const { isAuthenticated, loading, setIsAuthenticated } = useAuth();

//       useEffect(() => {
//         if (!router.isReady) return;

//         const checkAuth = async () => {
//           if (loading) {
//             try {
//               const response = await validateUser();
//               setIsAuthenticated(response === "Authenticated");
//             } catch (error) {
//               console.error("Token validation failed", error);
//               setIsAuthenticated(false);
//               router.push("/user/login");
//             }
//           } else if (!isAuthenticated) {
//             router.push("/user/login");
//           } else if (router.pathname !== redirectUrl) {
//             router.push(redirectUrl);
//           }
//         };

//         checkAuth();
//       }, [router.isReady, loading, isAuthenticated, router, redirectUrl]);

//       if (loading) {
//         return <div>Loading...</div>; // Replace with your loading component
//       }

//       return isAuthenticated ? <WrappedComponent {...props} /> : null;
//     };
//   };
// };

// // Usage example:
// // export default useRequireAuth()(YourProtectedComponent);

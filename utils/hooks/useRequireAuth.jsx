import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateUser } from "../api/apiService";

// ------------------------------------------------------
// This custom hook (useRequireAuth) is used to protect certain routes/pages in the application.
// It checks the user's authentication status using the validateUser function. If the user
// is authenticated, they are redirected to the specified 'redirectUrl'. If not authenticated,
// the user is redirected to the home page ('/'). This hook ensures that certain parts of
// the application are accessible only to authenticated users.
// ------------------------------------------------------

export const useRequireAuth = (redirectUrl) => {
  const router = useRouter();
  console.log("useRequireAuth", redirectUrl);

  useEffect(() => {
    // This effect runs the authentication check when the component mounts.
    const checkAuthStatus = async () => {
      try {
        const response = await validateUser();
        if (response === "Authenticated") {
          // If the user is authenticated, redirect to the specified URL.
          router.push(redirectUrl);
        }
      } catch (error) {
        // If authentication fails, redirect to the home page.
        // console.error("Authentication check failed - Protected route", error);
        // Handle not authenticated scenario, like redirect to login
        router.push("/");
      }
    };
    checkAuthStatus();
  }, [router, redirectUrl]);
};

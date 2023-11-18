import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateUser } from "../api/apiService";

export const useRequireAuth = (redirectUrl) => {
  const router = useRouter();
  console.log("useRequireAuth", redirectUrl);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await validateUser();
        if (response === "Authenticated") {
          console.log("response", response);
          router.push(redirectUrl);
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        // Handle not authenticated scenario, like redirect to login
        router.push("/");
      }
    };
    checkAuthStatus();
  }, [router, redirectUrl]);
};

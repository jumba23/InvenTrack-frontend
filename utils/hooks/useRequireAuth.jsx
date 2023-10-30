import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useRequireAuth = (redirectUrl = "/") => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push(redirectUrl);
    }
  }, []);
};

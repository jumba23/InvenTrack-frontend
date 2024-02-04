// import { useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { validateUser } from "@/utils/api/apiService";

// export const useAuthStatus = ({ setIsAuthenticated, setLoading }) => {
//   // const { setIsAuthenticated, setLoading } = useAuth();

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const response = await validateUser();
//         setIsAuthenticated(response === "Authenticated");
//       } catch (error) {
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuthStatus();
//   }, [setIsAuthenticated, setLoading]);
// };

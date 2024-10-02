//app/user/login/page.jsx

"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useAuthError } from "@/utils/hooks/Errors";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { getUserFriendlyErrorMessage } from "@/utils/api/errorHandling";

// ========================= SUMMARY =========================
// This component is a login form that allows users to sign in
// to the application. It includes client-side validation for
// email format and non-empty fields before submission. It uses
// the login function from the AuthContext to send a login request
// to the API and handles any errors that occur.
// ==========================================================
// Usage:
// - Place this component inside the pages directory to create
//   the login page.
// - Ensure that the AuthContext and error handling utilities are properly set up.
// ==========================================================

const Copyright = (props) => {
  const currentYear = new Date().getFullYear();
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <span color="inherit" href="#">
        Soft Solutions
      </span>{" "}
      {currentYear}
      {"."}
    </Typography>
  );
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      dark: "#00008B",
      contrastText: "#fff",
    },
  },
});

const LoginForm = () => {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const {
    authError,
    handleAuthError,
    clearAuthError,
    getUserFriendlyAuthError,
  } = useAuthError();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      // If login is successful, the useEffect hook will handle redirection
    } catch (error) {
      console.error("Login error:", error);
      const errorObj = handleAuthError(error);
      // Log the detailed error object
      console.log("Detailed error:", {
        type: errorObj.type,
        message: errorObj.message,
        statusCode: errorObj.statusCode,
        details: errorObj.details,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {authError && (
            <Alert
              severity="error"
              onClose={clearAuthError}
              sx={{ mt: 2, width: "100%" }}
            >
              {authError.message || getUserFriendlyAuthError()}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <SubmitButton
              type="submit"
              className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </SubmitButton>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/user/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;

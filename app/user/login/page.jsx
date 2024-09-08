"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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
import {
  handleApiError,
  getUserFriendlyErrorMessage,
} from "@/utils/api/errorHandling";
import { useAuth } from "@/context/AuthContext"; // Import useAuth hook
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

// ========================= SUMMARY =========================
// This component is a login form that allows users to sign in
// to the application. It uses the userLogin function to send
// a login request to the API and handles any errors that occur.
// ==========================================================
// Usage:
// - Place this component inside the pages directory to create
//   the login page.
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
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      // redirect to dashboard if user is authenticated
      router.push("/dashboard");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error:", error);
      handleApiError(error, setErrorMsg, {
        serverError: "Unable to connect to the server. Please try again later.",
        networkError: "Network error. Please check your internet connection.",
        unexpectedError: "An unexpected error occurred. Please try again.",
      });

      // Use getUserFriendlyErrorMessage if specific error codes are available
      // const friendlyMessage = getUserFriendlyErrorMessage(error.code);
      // setErrorMsg(friendlyMessage);
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
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
              error={!!errorMsg}
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
              error={!!errorMsg}
            />
            {errorMsg && (
              <Typography color="error" variant="body2" align="center">
                {errorMsg}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
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

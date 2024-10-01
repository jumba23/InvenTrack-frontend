//app/user/signup/page.jsx

"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { userSignUp } from "@/utils/api/authService";
import { useRouter } from "next/navigation";
import {
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Alert,
  Grid,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// ========================= SUMMARY =========================
// This component is a sign-up form that allows new users to
// create an account. It includes client-side validation,
// improved error handling, and a more user-friendly UI.
// It uses react-hook-form for form management and Material-UI
// for consistent styling with the login form.
// ==========================================================
// Usage:
// - Place this component in the appropriate route for user registration.
// - Ensure that the authService and error handling utilities are set up.
// ==========================================================

const theme = createTheme();

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await userSignUp(data, setError);
      router.push("/user/login");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error);

      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([key, value]) => {
          setFormError(key, { type: "manual", message: value });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {error && (
            <Alert
              severity="error"
              onClose={handleRetry}
              sx={{ mt: 2, width: "100%" }}
            >
              {error.message}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              {...register("firstName", { required: "First Name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              {...register("lastName", { required: "Last Name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              id="cellNumber"
              label="Cell Number"
              name="cellNumber"
              autoComplete="tel"
              {...register("cellNumber")}
              error={!!errors.cellNumber}
              helperText={errors.cellNumber?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <button
              type="submit"
              className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Home Page
                </Link>
              </Grid>
              <Grid item>
                <Link href="/user/login" variant="body2">
                  {"Login instead?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpForm;

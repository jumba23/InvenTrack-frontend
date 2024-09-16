"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { userSignUp } from "@/utils/api/apiService";
import { handleApiError } from "@/utils/api/errorHandling";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Alert,
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
// - Ensure that the apiService and error handling utilities are set up.
// ==========================================================

const theme = createTheme();

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError(null);
    try {
      await userSignUp(
        data.firstName,
        data.lastName,
        data.cellNumber,
        data.email,
        data.password
      );
      router.push("/user/login");
    } catch (error) {
      console.error("Signup error:", error);
      const errorObj = handleApiError(error, setApiError, {
        serverError: "Unable to create account. Please try again later.",
        networkError: "Network error. Please check your internet connection.",
        unexpectedError: "An unexpected error occurred. Please try again.",
      });
      setApiError(errorObj.message);

      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([key, value]) => {
          setError(key, { type: "manual", message: value });
        });
      }
    } finally {
      setIsLoading(false);
    }
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
          {apiError && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {apiError}
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpForm;

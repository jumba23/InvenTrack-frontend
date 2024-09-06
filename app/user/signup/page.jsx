"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { userSignUp } from "@/utils/api/apiService";
import {
  handleApiError,
  getUserFriendlyErrorMessage,
} from "@/utils/api/errorHandling";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // we are using react-hook-form for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  // Handle form submission
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
      handleApiError(error, setApiError, {
        serverError: "Unable to create account. Please try again later.",
        networkError: "Network error. Please check your internet connection.",
        unexpectedError: "An unexpected error occurred. Please try again.",
      });

      // Use getUserFriendlyErrorMessage if specific error codes are available
      // const friendlyMessage = getUserFriendlyErrorMessage(error.code);
      // setApiError(friendlyMessage);

      // Set field-specific errors if available from the API response
      if (error.response && error.response.data && error.response.data.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
          setError(key, {
            type: "manual",
            message: error.response.data.errors[key],
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: "First Name is required" })}
              className={`w-full p-2 border rounded ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          {/* Last Name Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName", { required: "Last Name is required" })}
              className={`w-full p-2 border rounded ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          {/* Cell Number Input */}
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Cell Number"
              {...register("cellNumber")}
              className={`w-full p-2 border rounded ${
                errors.cellNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className={`w-full p-2 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className={`w-full p-2 border rounded ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-2 text-white bg-green-500 rounded disabled:bg-green-300"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Submit"}
            </button>
          </div>
          {/* Error Message */}
          {errors.apiError && (
            <div className="text-center text-red-500">{apiError}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

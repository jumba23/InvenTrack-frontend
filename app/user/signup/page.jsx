"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { userSignUp } from "@/utils/api/apiService";
import { ErrorTypes } from "@/utils/errorHandling/errorTypes";
import { useRouter } from "next/navigation";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";

/**
 * SignUpForm Component
 *
 * This component renders a sign-up form for user registration.
 * It uses react-hook-form for form handling and validation, and
 * implements enhanced error handling for API responses.
 *
 * Features:
 * - Form validation using react-hook-form
 * - API integration for user registration
 * - Loading state management
 * - Comprehensive error handling for API and validation errors
 * - User-friendly error messages
 * - Responsive design using Tailwind CSS
 */
const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  /**
   * Handle form submission
   * @param {Object} data - Form data
   */
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

      // Handle API errors
      if (error.type === ErrorTypes.API_ERROR) {
        setApiError({
          type: error.type,
          message:
            error.message || "Failed to create account. Please try again.",
        });
      } else if (error.type === ErrorTypes.NETWORK_ERROR) {
        setApiError({
          type: error.type,
          message: "Network error. Please check your internet connection.",
        });
      } else {
        setApiError({
          type: ErrorTypes.UNEXPECTED_ERROR,
          message: "An unexpected error occurred. Please try again.",
        });
      }

      // Handle field-specific errors
      if (error.response && error.response.data && error.response.data.errors) {
        Object.entries(error.response.data.errors).forEach(([key, value]) => {
          setError(key, {
            type: "manual",
            message: value,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to retry submission
  const handleRetry = () => {
    setApiError(null);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-green-600">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form fields */}
          <InputField
            name="firstName"
            placeholder="First Name"
            register={register}
            errors={errors}
            validationRules={{ required: "First Name is required" }}
          />
          <InputField
            name="lastName"
            placeholder="Last Name"
            register={register}
            errors={errors}
            validationRules={{ required: "Last Name is required" }}
          />
          <InputField
            name="cellNumber"
            placeholder="Cell Number"
            type="tel"
            register={register}
            errors={errors}
          />
          <InputField
            name="email"
            placeholder="Email"
            type="email"
            register={register}
            errors={errors}
            validationRules={{ required: "Email is required" }}
          />
          <InputField
            name="password"
            placeholder="Password"
            type="password"
            register={register}
            errors={errors}
            validationRules={{ required: "Password is required" }}
          />

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full p-2 text-white transition duration-200 bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-green-300 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Submit"}
            </button>
          </div>
        </form>

        {/* Error Display */}
        {apiError && <ErrorDisplay error={apiError} onRetry={handleRetry} />}
      </div>
    </div>
  );
};

/**
 * InputField Component
 *
 * A reusable component for form input fields.
 */
const InputField = ({
  name,
  placeholder,
  type = "text",
  register,
  errors,
  validationRules = {},
}) => (
  <div className="mb-4">
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, validationRules)}
      className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
        errors[name] ? "border-red-500" : "border-gray-300"
      }`}
    />
    {errors[name] && (
      <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
    )}
  </div>
);

export default SignUpForm;

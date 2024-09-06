"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { userSignUp } from "@/utils/api/apiService";
import { handleApiError } from "@/utils/api/errorHandling";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();

  // we are using react-hook-form for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
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
      handleApiError(error, (msg) => setError("apiError", { message: msg }));
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
              className="w-full p-2 border border-gray-300 rounded"
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
              className="w-full p-2 border border-gray-300 rounded"
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
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border border-gray-300 rounded"
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
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-2 text-white bg-green-500 rounded"
            >
              Submit
            </button>
          </div>
          {/* Error Message */}
          {errors.apiError && (
            <div className="text-center text-red-500">
              {errors.apiError.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

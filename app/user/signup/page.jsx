"use client";
import React, { useState } from "react";
import { userSignUp } from "@/utils/api/apiService";
import { handleApiError } from "@/utils/api/errorHandling";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await userSignUp(
        firstName,
        lastName,
        cellNumber,
        email,
        password
      );
      console.log("Sign up form - response", response);

      router.push("/user/login");
    } catch (error) {
      handleApiError(error, setErrorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-1/3 p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl text-center">Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Cell Number"
              value={cellNumber}
              onChange={(e) => setCellNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-2 text-white bg-green-500 rounded"
            >
              Submit
            </button>
          </div>
          {errorMsg && (
            <div className="text-center text-red-500">{errorMsg}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

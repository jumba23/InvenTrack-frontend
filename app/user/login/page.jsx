"use client";

import React, { useState } from "react";
import Link from "next/link";
import { userLogin } from "@/utils/api/apiService";
import { handleApiError } from "@/utils/api/errorHandling";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await userLogin(email, password);
      console.log("data", data);

      router.push("/inventory");
    } catch (error) {
      handleApiError(error, setErrorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-1/3 p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl text-center">Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Type your password"
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
        <div className="flex flex-col mt-2 text-center">
          <Link href="/forgot-password" passHref>
            Forgot your password?
          </Link>
          <Link href="/user/signup" passHref>
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

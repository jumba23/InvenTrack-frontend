"use client";

import React, { useState } from "react";
// import supabaseClient from "../../utils/authentication/supabaseClient";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // crete axios request with try/catch
    const response = await axios.post("/api/login", {
      username,
      password,
    });

    // if successful, set token in local storage
    localStorage.setItem("token", response.data.token);

    // redirect to inventory page using next router
    Router.push("/inventory");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-1/3 p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl text-center">Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Type your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

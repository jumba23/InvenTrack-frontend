// app/error.jsx

"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          Oops! Something went wrong
        </h1>
        <p className="mb-4 text-gray-600">
          We&rsquo;re sorry, but an unexpected error occurred. Our team has been
          notified and is working to fix the issue.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => reset()}
            className="px-4 py-2 font-bold text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 font-bold text-center text-gray-800 transition duration-300 bg-gray-200 rounded hover:bg-gray-300"
          >
            Return to Homepage
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          If the problem persists, please contact our support team.
        </p>
      </div>
    </div>
  );
}

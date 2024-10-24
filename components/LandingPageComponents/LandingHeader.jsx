//components/LandingPageComponents/LandingHeader.jsx

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

/**
 * LandingHeader Component
 *
 * @component
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes for styling
 *
 * Purpose:
 * Renders the header for the landing page, with a mobile-first approach.
 *
 * Features:
 * - Mobile layout: Logo on the left, buttons on the right
 * - Desktop layout: Logo and text on the left, buttons on the right
 * - Responsive design for various screen sizes
 * - Accessible image with alt text
 *
 * @example
 * <LandingHeader className="my-custom-class" />
 */
const LandingHeader = ({ className }) => {
  const router = useRouter();

  return (
    <header
      className={`flex items-center justify-between p-4 border-y-2 ${className}`}
    >
      <div className="flex items-center">
        <Image
          src="/images/logo.png"
          alt="InvenTrack Logo"
          width={40}
          height={40}
          style={{ width: "auto", height: "auto" }}
          className="w-auto h-auto"
        />
        <h1 className="ml-2 text-xl font-semibold text-blue-600 sm:block">
          InvenTrack
        </h1>
      </div>
      <nav className="flex space-x-2">
        <button
          className="px-3 py-1 text-sm text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => router.push("/user/login")}
        >
          Login
        </button>
        <button
          className="px-3 py-1 text-sm text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => router.push("/user/signup")}
        >
          Sign Up
        </button>
      </nav>
    </header>
  );
};

export default LandingHeader;

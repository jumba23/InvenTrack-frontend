"use client";

import React from "react";
import IndexLayout from "../layouts/IndexLayout";

//------------------------------------------------------
// Home Component: Entry Point of the Application
// Functionality:
// - Serves as the primary entry point for the InvenTrack application.
// - Wraps the rendered layout components within the AuthProvider context to provide
//   authentication-related state and functionalities to child components.
//
// Usage:
// - This component is automatically rendered as the default page due to Next.js's
//   file-based routing system, representing the root of the application.
//------------------------------------------------------

export default function Home() {
  return <IndexLayout />;
}

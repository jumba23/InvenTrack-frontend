import "./globals.css";

// Metadata for the application.
export const metadata = {
  title: "InvenTrack",
  description: "Inventory Tracking System",
};

//------------------------------------------------------
// RootLayout serves as the foundational layout component for the InvenTrack application.
// It defines the basic HTML structure and is responsible for rendering children components.
// This layout is typically used at the top level of the application to wrap around
// the entire content, providing a consistent structure across different pages.
//------------------------------------------------------

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

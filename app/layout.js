import "./globals.css";

export const metadata = {
  title: "InvenTrack",
  description: "Inventory Tracking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/not-found.jsx

import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "404 - Page Not Found | InvenTrack",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <Image
          src="/images/not-found.png"
          alt="404 Illustration"
          width={1000}
          height={1000}
          className="mx-auto mb-8"
        />
        {/* <h1 className="mb-4 text-4xl font-bold text-gray-800">
          404 - Page Not Found
        </h1> */}
        <p className="mb-8 text-xl text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="px-4 py-2 font-bold text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}

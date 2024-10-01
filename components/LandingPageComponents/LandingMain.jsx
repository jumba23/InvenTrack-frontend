//components/LandingPageComponents/LandingMain.jsx

import Image from "next/image";
import React from "react";

/**
 * LandingMain Component
 *
 * @component
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes for styling
 *
 * Purpose:
 * Displays the main content of the landing page, with larger content on desktop.
 *
 * Features:
 * - Mobile layout: Vertically stacked and center-aligned content
 * - Desktop layout: Side-by-side content with larger size
 * - Responsive design with emphasis on desktop presentation
 * - Optimized image loading with Next.js Image component
 * - Accessible image with meaningful alt text
 *
 * @example
 * <LandingMain className="my-custom-class" />
 */
const LandingMain = ({ className }) => {
  return (
    <main
      className={`flex flex-col items-center justify-center ${className} p-4 md:p-8 lg:p-12 space-y-6 md:space-y-0 md:flex-row md:space-x-8 lg:space-x-12`}
    >
      <div className="w-full max-w-md md:max-w-none md:w-1/2 lg:w-3/5">
        <Image
          src="/images/landing-page.png"
          alt="People managing inventory with InvenTrack"
          width={1200}
          height={1200}
          className="w-full h-auto rounded-lg"
          priority={true}
        />
      </div>
      <div className="w-full max-w-md p-6 bg-blue-100 rounded-lg md:max-w-none md:w-1/2 lg:w-2/5 md:p-8">
        <p className="text-xl italic text-center md:text-3xl lg:text-4xl font-open-sans md:text-left">
          Interact <span className="font-bold">seamlessly</span> with your
          inventory. Stay <span className="font-bold">ahead</span> effortlessly.
          Dive into <span className="font-bold">efficiency</span> with
          InvenTrack.
        </p>
      </div>
    </main>
  );
};

export default LandingMain;

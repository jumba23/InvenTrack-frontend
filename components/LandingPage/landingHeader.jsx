import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const LandingHeader = ({ className }) => {
  const route = useRouter();

  return (
    <div
      className={`flex items-center justify-between ${className} pr-12 border-y-2`}
    >
      <div className="flex items-center justify-start h-24 pl-8 ">
        <Image
          src="/images/logo.png"
          alt="InvenTrack Logo"
          width={60}
          height={60}
        />
        <div className="ml-2 text-2xl font-semibold leading-loose text-blue-600 ">
          InvenTrack
        </div>
      </div>
      <div className="space-x-4">
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded"
          onClick={() => route.push("/user/login")}
        >
          Login
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded"
          onClick={() => route.push("/user/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingHeader;

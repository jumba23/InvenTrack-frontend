import Image from "next/image";
import React from "react";
// import sampleUserImage from "../../public/images/sample_user.jpg";

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between h-24 p-10 align-middle border-2">
      <div className=" w-96">
        <div className="flex h-10 p-2 border border-gray-300">
          <input
            className="w-full p-2 rounded-full outline-none"
            type="search"
            placeholder="Search products, suppliers, orders"
          />
          <button className="flex items-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 22 22"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                id="Vector"
                d="M21.7275 20.4093L16.9402 15.6226C16.697 15.3795 16.3535 15.3025 16.0431 15.3844L15.016 14.3573C16.1747 13.0448 16.8846 11.3267 16.8846 9.44218C16.8846 5.33871 13.5462 2 9.44264 2C5.3385 2 1.99979 5.33871 1.99979 9.44285C1.99979 13.5467 5.3385 16.885 9.44264 16.885C11.3269 16.885 13.0449 16.1755 14.3577 15.0164L15.3848 16.0436C15.3029 16.354 15.3796 16.6972 15.6231 16.9406L20.4098 21.727C20.5921 21.9093 20.83 22 21.0686 22C21.3072 22 21.5454 21.909 21.7275 21.727C22.0912 21.3633 22.0912 20.7733 21.7275 20.4093L21.7275 20.4093ZM2.93171 9.44254C2.93171 5.85288 5.85214 2.93187 9.44239 2.93187C13.0326 2.93187 15.9527 5.85288 15.9527 9.44287C15.9527 13.0325 13.032 15.9532 9.44239 15.9532C5.8528 15.9532 2.93171 13.0325 2.93171 9.44254Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#A9A9A9"
          className="cursor-pointer w-7 h-7 icon-hover"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
        <div className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full cursor-pointer icon-hover ">
          <Image
            src="/images/sample_user.jpg"
            alt="Your Image Description"
            width={48}
            height={48}
            className="rounded-full cursor-pointer hover:opacity-75"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

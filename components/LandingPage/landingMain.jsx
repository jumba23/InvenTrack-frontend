import Image from "next/image";
import React from "react";

// const LandingMain = () => {
//   return (
//     <div className="flex items-center">
//       <Image
//         src="/images/landing-page.png"
//         alt="Image of people keeping track of their inventory"
//         // objectFit="cover"
//         // layout="responsive"
//         width={800}
//         height={800}
//         className="flex-1 rounded-lg"
//       />
//       <div className="flex-1 p-10 text-4xl italic text-gray-700 bg-gray-100 font-merriweather">
//         Interact seamlessly with your inventory. Stay ahead effortlessly. Dive
//         into efficiency with InvenTrack.
//       </div>
//     </div>
//   );
// };

const LandingMain = () => {
  return (
    <div className="flex items-center flex-grow overflow-hidden">
      <div className="relative w-1/2">
        <Image
          src="/images/landing-page.png"
          alt="Image of people keeping track of their inventory"
          objectFit="contain"
          layout="responsive"
          width={800}
          height={800}
          className="rounded-lg"
        />
      </div>
      <div className="w-1/2 p-6 pl-10 overflow-hidden text-3xl italic bg-blue-100 font-open-sans">
        Interact <span className="font-bold">seamlessly</span> with your
        inventory. Stay <span className="font-bold">ahead</span> effortlessly.
        Dive into <span className="font-bold">efficiency</span> with InvenTrack.
      </div>
    </div>
  );
};

export default LandingMain;

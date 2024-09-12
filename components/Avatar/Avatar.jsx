import React, { useState, useCallback } from "react";
import Image from "next/image";

const Avatar = ({ src, alt, size = 100 }) => {
  const [imageError, setImageError] = useState(false);
  const defaultAvatarUrl = "/images/default-avatar.png";

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <Image
        key={imageError ? "default" : src}
        src={imageError ? defaultAvatarUrl : src}
        alt={alt}
        fill
        sizes={`${size}px`}
        style={{ objectFit: "cover" }}
        onError={handleImageError}
      />
    </div>
  );
};

export default Avatar;

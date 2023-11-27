import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  image: string;
  alt: string;
  className: string;
}

const CustomImage = ({ image, alt, className }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      src={image}
      alt={alt}
      className={cn(
        "object-cover duration-700 ease-in-out",
        isLoading
          ? "scale-110 blur-xl grayscale"
          : "scale-100 blur-0 grayscale-0",
        className
      )}
      fill
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
};

export default CustomImage;

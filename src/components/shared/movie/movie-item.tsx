import React from "react";
import { MovieProps } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  movie: MovieProps;
}

const MovieItem = ({ movie }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="relative cardWrapper h-28 min-w-[180px] cursor-pointer md:h-36 md:min-w-[260px] transform transition duration-500 hover:scale-110 hover:z-[999]">
      <Image
        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${movie?.backdrop_path || movie?.poster_path}`}
        alt={"Image"}
        className="rounded sm object-cover md:rounded hover:rounded-sm"
        fill
      />
      </div>
    </motion.div>
  );
};

export default MovieItem;

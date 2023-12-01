import React, { Dispatch, SetStateAction } from "react";
import { FavouriteProps, MovieProps } from "@/types";
import { motion } from "framer-motion";
import { CheckIcon, PlusIcon, ChevronDown, MinusIcon } from "lucide-react";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import CustomImage from "../custom-image";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  movie: MovieProps;
  favouriteId?: string;
  setFavourites?: Dispatch<SetStateAction<FavouriteProps[]>>;
}

const MovieItem = ({ movie, favouriteId = "", setFavourites }: Props) => {
  const { setOpen, setMovie, account } = useGlobalContext();
  const { data: session }: any = useSession();

  const openHandler = () => {
    setMovie(movie);
    setOpen(true);
  };

  const onRemove = async () => {
    try {
      const { data } = await axios.delete(`/api/favorites?id=${favouriteId}`);
      if (data.success) {
        if (setFavourites) {
          setFavourites((prev: FavouriteProps[]) =>
            prev.filter((item) => item._id !== favouriteId)
          );
        }
        toast.success("Movie Successfully Removed");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = async () => {
    try {
      const { data } = await axios.post("/api/favorites", {
        uid: session?.user?.uid,
        accountId: account?._id,
        backdrop_path: movie?.backdrop_path,
        poster_path: movie?.poster_path,
        movieId: movie?.id,
        type: movie?.type,
        title: movie?.title || movie?.name,
        overview: movie?.overview,
      });

      if (data?.success) {
        toast.success("Movie added to favourites");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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
        <CustomImage
          image={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${
            movie?.backdrop_path || movie?.poster_path
          }`}
          alt="Image"
          onClick={openHandler}
          className={"rounded sm object-cover md:rounded hover:rounded-sm"}
        />

        <div className="space-x-3 hidden absolute p-2 bottom-0 buttonWrapper">
          <button
            className={`cursor-pointer border flex p-2 items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75 text-black`}
          >
            {favouriteId.length ? (
              <MinusIcon
                color="#ffffff"
                className="h-7 w-7"
                onClick={onRemove}
              />
            ) : (
              <PlusIcon onClick={onAdd} color="#ffffff" className="h-7 w-7" />
            )}
          </button>
          <button className="cursor-pointer p-2 border flex items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90  border-white  bg-black opacity-75 ">
            <ChevronDown
              color="#fff"
              onClick={openHandler}
              className="h-7 w-7"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieItem;

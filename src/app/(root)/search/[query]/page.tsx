"use client";
import React, { useEffect, useState } from "react";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import Loader from "@/components/shared/loader";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { getSearchMovies } from "@/lib/api";
import { toast } from "react-toastify";
import { MovieProps } from "@/types";
import { motion } from "framer-motion";
import Navbar from "@/components/shared/navbar";
import MovieItem from "@/components/shared/movie/movie-item";
import NotFound from "@/components/shared/not-found";

const Page = () => {
  const { data: session } = useSession();
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const params = useParams();
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [tv, movies] = await Promise.all([
          getSearchMovies("tv", params.query as string),
          getSearchMovies("movie", params.query as string),
        ]);

        const tvShows = tv
          .filter(
            (item: MovieProps) =>
              item.backdrop_path !== null && item.poster_path !== null
          )
          .map((item: MovieProps) => ({ ...item, type: "tv" }));

        const moviesShows = movies
          .filter(
            (item: MovieProps) =>
              item.backdrop_path !== null && item.poster_path !== null
          )
          .map((item: MovieProps) => ({ ...item, type: "movie" }));

        setMovies([...tvShows, ...moviesShows]);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setPageLoader(false);
      }
    };
    getData();
  }, []);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Navbar />
      {movies && movies.length ? (
        <>
          <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
            <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
              Showing Results for
              <span className=" text-red-600 ml-2">
                {decodeURI(params.query as string)}
              </span>
              <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
                {movies.map((movie) => (
                  <MovieItem key={movie.id} movie={movie} />
                ))}
              </div>
            </h2>
          </div>
        </>
      ) : (
        <NotFound
          title="Movies not found :("
          desc="This search did not find any information on this"
        />
      )}
    </motion.div>
  );
};

export default Page;

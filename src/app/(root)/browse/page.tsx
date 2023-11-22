"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import Loader from "@/components/shared/loader";
import Common from "@/components/shared/common";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "@/lib/api";
import { MovieDataProps, MovieProps } from "@/types";
const Page = () => {
  const [moviesData, setMoviesData] = useState<MovieDataProps[]>([]);

  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const { data: session } = useSession();

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const [
          trendingTv,
          topRatedTv,
          popularTv,
          trendingMovie,
          topRatedMovie,
          popularMovie,
        ] = await Promise.all([
          getTrendingMovies("tv"),
          getTopRatedMovies("tv"),
          getPopularMovies("tv"),

          getTrendingMovies("movie"),
          getTopRatedMovies("movie"),
          getPopularMovies("movie"),
        ]);

        const tvShows: MovieDataProps[] = [
          { title: "Trending TV Shows", data: trendingTv },
          { title: "Top Rated TV Shows", data: topRatedTv },
          { title: "Popular TV Shows", data: popularTv },
        ].map((item) => ({
          ...item,
          data: item.data.map((movie: MovieProps) => ({
            ...movie,
            type: "tv",
            addedToFavorites:false
          })),
        }));

        const moviesShows: MovieDataProps[] = [
          { title: "Trending Movie Shows", data: trendingMovie },
          { title: "Top Rated Movie Shows", data: topRatedMovie },
          { title: "Popular Movie Shows", data: popularMovie },
        ].map((item) => ({
          ...item,
          data: item.data.map((movie: MovieProps) => ({
            ...movie,
            type: "movie",
            addedToFavorites:false
          })),
        }));

        const allMovies: MovieDataProps[] = [...moviesShows, ...tvShows];

        setMoviesData(allMovies);
      } catch (error) {
        console.log(error);
      } finally {
        setPageLoader(false);
      }
    };
    getAllMovies();
  },[]);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return <Common moviesData={moviesData}/>;
};

export default Page;

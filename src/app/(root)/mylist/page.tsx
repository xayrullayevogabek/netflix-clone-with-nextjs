"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/context";
import { toast } from "react-toastify";
import { getFavouritesMovie } from "@/lib/api";
import { FavouriteProps, MovieProps } from "@/types";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import Loader from "@/components/shared/loader";
import Navbar from "@/components/shared/navbar";
import Banner from "@/components/shared/banner";
import MovieItem from "@/components/shared/movie/movie-item";
import NotFound from "@/components/shared/not-found";

const Page = () => {
  const [data, setData] = useState<FavouriteProps[]>([]);
  const { data: session }: any = useSession();
  const { account, pageLoader, setPageLoader } = useGlobalContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getFavouritesMovie(
          session?.user?.uid,
          account?._id
        );
        setData(data);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setPageLoader(false);
      }
    };
    if (session && account) {
      getData();
    }
  }, [account, session]);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="md:px-12 px-4\">
        {data && data.length === 0 ? (
          <NotFound />
        ) : (
          <>
            <Banner movies={data as unknown as MovieProps[]} />
            <div className="h-40 space-y-0.5 md:space-y-2 px-4">
              <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
                My List
              </h2>

              <div className="group relative md:-ml-2 pb-12">
                <div className="grid grid-cols-5 gap-4">
                  {data &&
                    data
                      .map((fav: FavouriteProps) => (
                        <MovieItem
                          key={fav.movieId}
                          movie={
                            {
                              backdrop_path: fav.backdrop_path,
                              poster_path: fav.poster_path,
                              id: +fav.movieId as number,
                              type: fav.type,
                              title: fav.title,
                              overview: fav.overview,
                            } as MovieProps
                          }
                          favouriteId={fav._id}
                          setFavourites={setData}
                        />
                      ))
                      .reverse()}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Page;

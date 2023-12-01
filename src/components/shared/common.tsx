import React from "react";
import Navbar from "./navbar";
import { MovieDataProps } from "@/types";
import Banner from "./banner";
import MovieRow from "@/components/shared/movie/movie-row";

interface Props {
  moviesData: MovieDataProps[];
}

const Common = ({ moviesData }: Props) => {
  return (
    <div>
      <Navbar />
      <div className="relative pl-4 pb-24 lg:space-y-24">
        <Banner movies={moviesData && moviesData[0].data} />
      </div>

      <section className=" md:space-y-16">
        {moviesData &&
          moviesData.map((movie) => (
            <MovieRow title={movie.title} data={movie.data} key={movie.title} />
          ))}
      </section>
    </div>
  );
};

export default Common;

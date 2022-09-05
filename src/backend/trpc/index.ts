import * as trpc from "@trpc/server";
import { z } from "zod";

type TMDB_movie = {
  id: number;
  title: string;
  vote_count: number;
  poster_path: string | null;
  vote_average: number;
};

export const appRouter = trpc.router().query("getPopular", {
  async resolve() {
    let response = await fetch(
      `${process.env.TMDB_URL}movie/popular?api_key=${process.env.TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => response);

    // console.log(response);
    return {
      movies: response.results.map((el: TMDB_movie) => {
        return {
          ...el,
          poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face${el.poster_path}`,
        };
      }) as TMDB_movie[],
    };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

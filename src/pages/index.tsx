import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { inferQueryResponse } from "./api/trpc/[trpc]";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["getPopular"]);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div className="w-screen flex flex-col items-center relative justify-around">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-2xl text-center pt-8">Popular Movies</div>
      <div className="pb-8" />

      <div className="flex w-screen justify-start overflow-auto scrollbar-none">
        {data &&
          data.movies &&
          data.movies.map((el: MovieFromServer) => (
            <MovieListing key={el.id} movie={el} />
          ))}
      </div>
    </div>
  );
};

export default Home;

type MovieFromServer = inferQueryResponse<"getPopular">["movies"][0];

const MovieListing: React.FC<{
  movie: MovieFromServer;
}> = ({ movie }) => {
  return (
    <div className={`flex shrink-0 flex-col items-center m-4`} key={movie.id}>
      <div className="text-xl text-center capitalize mt-[-0.5rem]">
        {movie.title}
      </div>
      {movie.poster_path && (
        <Image
          alt={`poster of ${movie.title}`}
          src={movie.poster_path}
          width={220}
          height={330}
        />
      )}
      <div>{movie.vote_average}</div>
    </div>
  );
};

import { useState, useEffect } from "react";

const KEY = "68fc7374";

export function useMovies(query /*, callback*/) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not Found");

          setMovies(data?.Search);
          setError("");
          console.log(data ? data.Search : "");
        } catch (e) {
          if (e.name !== "AbortError") {
            console.log("error", e.message);
            setError(e.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      // callback?.(); // handleCloseMovie();
      fetchMovies();

      return () => controller.abort();
    },
    [query]
  ); // useEffect

  return { movies, isLoading, error };
}

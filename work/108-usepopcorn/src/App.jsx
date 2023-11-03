import { useEffect, useState } from "react";
import "./App.css";

import { Loader, ErrorMessage, Main, Box } from "./components/utilities";
import { NavBar, Search, NumResults } from "./components/navbar";
import { MovieList, MovieDetails } from "./components/movielist";
import { WatchedMovieList, WatchedSummary } from "./components/watchlist";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

// import { tempMovieData, tempWatchedData } from "./movie-data";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query /*, handleCloseMovie*/);
  const [watched, setWatched] = useLocalStorage([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    if (!isWatchedIncludes(movie.imdbID)) {
      setWatched((prevWatched) => [...prevWatched, movie]);
    }
  }

  function isWatchedIncludes(id) {
    return watched.map((m) => m.imdbID).includes(id);
  }

  function handleDeleteWatched(id) {
    setWatched((prevWatched) => prevWatched.filter((m) => m.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery}></Search>
        <NumResults movies={movies}></NumResults>
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        {/* <WatchedBox></WatchedBox> */}
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            ></MovieDetails>
          ) : (
            <>
              <WatchedSummary watched={watched}></WatchedSummary>
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              ></WatchedMovieList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

/*
function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched}></WatchedSummary>
          <WatchedMovieList watched={watched}></WatchedMovieList>
        </>
      )}
    </div>
  );
}
*/

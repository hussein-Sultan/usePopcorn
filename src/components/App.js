import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Logo from "./NavBar/Logo";
import SearchBar from "./NavBar/SearchBar";
import NumResult from "./NavBar/NumResult";
import PageContent from "./PageContent";
import MoviesList from "./PageContent/MoviesList";
import Box from "./PageContent/Box";
import WatchedSummary from "./PageContent/WatchedSummary";
import WatchedMoviesList from "./PageContent/WatchedMoviesList";
import Loader from "./PageContent/Loader";
import ErrorMsg from "./PageContent/ErrorMsg";
import MovieDetials from "./PageContent/MovieDetials";

const KEY = "aaab5db3"; //? i declared this variable outside of the component, to prevent multiple creatation

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  //! useEffect callbacks are synchronous, we can't use it as async function
  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError(""); //? to reset error state
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something Went Wrong With Fetching Movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie Not Found");

          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      handleColseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  ); //? [] dependency array

  const handleSelectMovie = (id) => {
    setSelectedId((selected) => (selected === id ? null : id));
  };

  const handleColseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>

      <PageContent>
        <Box>
          {/* one of these is rendered */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMsg message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetials
              KEY={KEY}
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={handleColseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </PageContent>
    </>
  );
}

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
import { useMovies } from "./CustomHooks/useMovies";

const KEY = "aaab5db3"; //? i declared this variable outside of the component, to prevent multiple creatation

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, handleColseMovie); //? custom hook
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });


  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  const handleSelectMovie = (id) => {
    setSelectedId((selected) => (selected === id ? null : id));
  };

  function handleColseMovie() {
    setSelectedId(null);
  }

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

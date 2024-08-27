import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Button from "./Button";
import Loader from "./Loader";
import { useKey } from "../CustomHooks/useKey";

export default function MovieDetials({
  KEY,
  watched,
  selectedId,
  onCloseMovie,
  onAddWatched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      async function fetchMovieDetials() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res.ok) throw new Error("Movie Not Found");

          const data = await res.json();
          setMovie(data);
          setIsLoading(false);
        } catch (err) {
          console.log(err.message);
        }
      }

      fetchMovieDetials();
    },
    [selectedId, KEY]
  );

  useEffect(() => {
    if (!title) return;

    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);

  const handleAdd = () => {
    const newWatchedMovie = {
      year,
      title,
      poster,
      userRating,
      imdbID: selectedId,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <Button Style="btn-back" onAction={onCloseMovie}>
              &larr;
            </Button>
            <img src={poster} alt={`Poster Of ${movie} Movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released}. {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                <span>{imdbRating} IMDB rating</span>
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <Button Style={"btn-add"} onAction={handleAdd}>
                      + Add To List
                    </Button>
                  )}
                </>
              ) : (
                <p className="text-3xl">
                  You Rated With Movie{" "}
                  <span className="text-2xl"> ⭐{watchUserRating}</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed By {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

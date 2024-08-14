import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((watched) => (
        <WatchedMovie
          watched={watched}
          onDeleteWatched={onDeleteWatched}
          key={watched.imdbID}
        />
      ))}
    </ul>
  );
}

import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((watched) => (
        <WatchedMovie watched={watched} key={watched.imdbID} />
      ))}
    </ul>
  );
}

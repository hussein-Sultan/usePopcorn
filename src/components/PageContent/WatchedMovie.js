import Button from "./Button";

export default function WatchedMovie({ watched, onDeleteWatched }) {
  return (
    <li>
      <img src={watched.poster} alt={`${watched.title} poster`} />
      <h3>{watched.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{watched.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{watched.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{watched.runtime} min</span>
        </p>
        <Button onAction={() => onDeleteWatched(watched.imdbID)}>❌</Button>
      </div>
    </li>
  );
}

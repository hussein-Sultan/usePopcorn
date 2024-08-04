export default function WatchedMovie({ watched }) {
  return (
    <li>
      <img src={watched.Poster} alt={`${watched.Title} poster`} />
      <h3>{watched.Title}</h3>
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
      </div>
    </li>
  );
}

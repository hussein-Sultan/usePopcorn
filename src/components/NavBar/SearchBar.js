import { useState } from "react";

export default function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search"
      placeholder="Search movies..."
    />
  );
}

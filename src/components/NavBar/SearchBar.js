import { useRef } from "react";
import { useKey } from "../CustomHooks/useKey";

export default function SearchBar({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) {
      return;
    }
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search"
      placeholder="Search movies..."
      ref={inputEl}
    />
  );
}

import { useState } from "react";
import Button from "./Button";

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <Button Style="btn-toggle" onAction={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </Button>

      {isOpen && children}
    </div>
  );
}

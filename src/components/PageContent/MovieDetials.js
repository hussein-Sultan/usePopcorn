import Button from "./Button";

export default function MovieDetials({ selectedId, onCloseMovie }) {
  return (
    <div className="details">
      <Button Style="btn-back" onAction={onCloseMovie}>
        &larr;
      </Button>
      {selectedId}
    </div>
  );
}

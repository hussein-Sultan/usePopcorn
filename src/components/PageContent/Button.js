export default function Button({ Style, onAction, children }) {
  return (
    <button className={Style} onClick={onAction}>
      {children}
    </button>
  );
}

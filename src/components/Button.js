export default function Button({ label, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg p-4 font-semibold ${className}`}
    >
      {label}
    </button>
  );
}

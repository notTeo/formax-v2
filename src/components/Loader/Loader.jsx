import "./Loader.css";

export default function Loader({ size = 48, className = "", label = "Loading" }) {
  return (
    <svg
      className={`loader ${className}`.trim()}
      width={size}
      height={size}
      viewBox="66 52 28 33"
      xmlns="http://www.w3.org/2000/svg"
      role="status"
      aria-label={label}
    >
      <polygon
        className="loader-bar loader-bar-1"
        points="68.01 82.97 72.75 82.97 72.75 54.3 68.01 57.26 68.01 82.97"
      />
      <polygon
        className="loader-bar loader-bar-2"
        points="77.1 56.29 77.1 63.11 91.99 69.99 91.99 63.14 77.1 56.29"
      />
      <polygon
        className="loader-bar loader-bar-3"
        points="77.1 69.24 77.1 76.09 91.99 82.97 91.99 76.11 77.1 69.24"
      />
    </svg>
  );
}

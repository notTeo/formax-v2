import "./FilterBar.css";

export default function FilterBar({ categories, activeFilter, onFilterChange }) {
  return (
    <div className="filter-bar">
      {categories.map((category) => (
        <button
          key={category.value}
          type="button"
          className={activeFilter === category.value ? "active" : ""}
          aria-pressed={activeFilter === category.value}
          onClick={() => onFilterChange(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

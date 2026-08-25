import { useState } from "react";

// ============================================================
// SEARCH BAR COMPONENT
// ============================================================

const SearchBar = () => {
  /* Preset Tailwind styles */
  const formClass =
    "flex items-center w-full max-w-md bg-white border border-gray-200 rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-400";
  const inputClass = "flex-1 px-4 py-2 outline-none text-sm text-gray-700";
  const btnClass = "px-4 py-2 text-gray-500 hover:bg-slate-800 transition";

  // ============================================================
  // SEARCH STATE
  // ============================================================

  // Stores the current search input value.
  const [search, setSearch] = useState("");

  // ============================================================
  // SEARCH SUBMISSION
  // ============================================================

  // Prevents the default form submission and processes the current search value.
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Searching for:", search);
  };

  // ============================================================
  // SEARCH BAR RENDER
  // ============================================================

  // Renders the search form with an input field an a button to submit the search.
  return (
    <form onSubmit={handleSubmit} className={formClass}>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search doctors or specialities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={inputClass}
      />

      {/* Search submission button */}
      <button type="submit" className={btnClass}>
        🔍
      </button>
    </form>
  );
};

export default SearchBar;

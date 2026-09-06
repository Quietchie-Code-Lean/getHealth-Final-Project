import { useState } from "react";

// ============================================================
// SEARCH BAR COMPONENT
// ============================================================

const SearchBar = () => {

  /* Preset Tailwind styles */
  const formClass = "flex w-full max-w-md items-center overflow-hidden rounded-full border border-slate-600 bg-slate-800 shadow-sm transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/30";
  const inputClass = "flex-1 bg-transparent px-4 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500";
  const btnClass = "px-4 py-2 text-slate-400 transition hover:bg-violet-500/10 hover:text-violet-300";

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

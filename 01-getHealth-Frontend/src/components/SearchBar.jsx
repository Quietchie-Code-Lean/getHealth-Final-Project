import { useState } from "react";

const SearchBar = () => {
    /* Preset Tailwind styles */
    const formClass = "flex items-center w-full max-w-md bg-white border border-gray-200 rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-400";
    const inputClass = "flex-1 px-4 py-2 outline-none text-sm text-gray-700";
    const btnClass = /* "mr-1 flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"; */
    "px-4 py-2 text-gray-500 hover:bg-slate-800 transition";

    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Searching for:", search);

    };

    return (
        <form onSubmit={handleSubmit} className={formClass}>

            <input
                type="text"
                placeholder="Search doctors or specialities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={inputClass}/>

            <button type="submit" className={btnClass}>🔍</button>

        </form>
    );
};

export default SearchBar;

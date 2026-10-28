
function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
      <span className="search-icon">🔍</span>

      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search Pokémon"
      />
    </div>
  );
}

export default SearchBar;

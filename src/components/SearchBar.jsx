const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search recipes..."
      className="w-full p-2 border rounded"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;

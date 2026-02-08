const FilterPanel = ({
  countryFilter,
  setCountryFilter,
  ratingFilter,
  setRatingFilter,
}) => {
  return (
    <div className="flex gap-4 mt-4">
      <select
        className="p-2 border rounded"
        value={countryFilter}
        onChange={(e) => setCountryFilter(e.target.value)}
      >
        <option value="">All Countries</option>
        <option value="Kenya">Kenya</option>
        <option value="Italy">Italy</option>
      </select>

      <select
        className="p-2 border rounded"
        value={ratingFilter}
        onChange={(e) => setRatingFilter(e.target.value)}
      >
        <option value="">Any Rating</option>
        <option value="4">4★ & up</option>
        <option value="5">5★ only</option>
      </select>
    </div>
  );
};

export default FilterPanel;

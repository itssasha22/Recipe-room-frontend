const FilterPanel = ({ onFilterChange }) => {
  return (
    <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', marginBottom: '1rem' }}>
      <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>Filters</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <select onChange={(e) => onFilterChange({ country: e.target.value })} style={{ padding: '0.5rem', borderRadius: '8px', border: '2px solid #10b981' }}>
          <option value="">All Countries</option>
          <option value="Argentina">Argentina</option>
          <option value="Brazil">Brazil</option>
          <option value="China">China</option>
          <option value="Egypt">Egypt</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="France">France</option>
          <option value="Ghana">Ghana</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Italy">Italy</option>
          <option value="Ivory Coast">Ivory Coast</option>
          <option value="Japan">Japan</option>
          <option value="Kenya">Kenya</option>
          <option value="Lebanon">Lebanon</option>
          <option value="Mexico">Mexico</option>
          <option value="Morocco">Morocco</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Poland">Poland</option>
          <option value="Russia">Russia</option>
          <option value="Somalia">Somalia</option>
          <option value="South Africa">South Africa</option>
          <option value="Spain">Spain</option>
          <option value="Thailand">Thailand</option>
          <option value="Ukraine">Ukraine</option>
        </select>
        <select onChange={(e) => onFilterChange({ rating: e.target.value })} style={{ padding: '0.5rem', borderRadius: '8px', border: '2px solid #10b981' }}>
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
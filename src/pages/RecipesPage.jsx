import { useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import RecipeCard from "../components/RecipeCard";

const RecipesPage = () => {
  // Mock data
  const allRecipes = [
    { id: 1, name: "Pilau", rating: 4, country: "Kenya" },
    { id: 2, name: "Pasta", rating: 5, country: "Italy" },
    { id: 3, name: "Ugali & Sukuma", rating: 3, country: "Kenya" },
  ];

  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  // Filtered recipes
  const filteredRecipes = allRecipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(search.toLowerCase()) &&
      (countryFilter ? recipe.country === countryFilter : true) &&
      (ratingFilter ? recipe.rating >= parseInt(ratingFilter) : true)
    );
  });

  return (
    <div className="p-6">
      <SearchBar search={search} setSearch={setSearch} />
      <FilterPanel
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;

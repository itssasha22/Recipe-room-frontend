import RatingStars from "./RatingStars";
import BookmarkButton from "./BookmarkButton";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="text-xl font-semibold">{recipe.name}</h2>
      <p className="text-sm text-gray-500">{recipe.country}</p>

      <RatingStars rating={recipe.rating} />
      <BookmarkButton />
    </div>
  );
};

export default RecipeCard;

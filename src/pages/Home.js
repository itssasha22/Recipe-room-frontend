import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import Loading from '../components/Loading';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { recipes, loading } = useSelector(state => state.recipes);

  useEffect(() => {
    // Fetch recipes
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Discover & Share Amazing Recipes</h1>
          <p>Join our community of food lovers</p>
          <SearchBar />
        </div>
      </section>

      <div className="container">
        <Filter />
        
        <div className="recipes-grid">
          {recipes?.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
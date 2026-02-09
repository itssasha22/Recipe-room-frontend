import React from 'react';
import './Filter.css';

const Filter = ({ onFilter }) => {
  return (
    <div className="filter">
      <select onChange={(e) => onFilter?.({ category: e.target.value })}>
        <option value="">All Categories</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="dessert">Dessert</option>
      </select>
      
      <select onChange={(e) => onFilter?.({ difficulty: e.target.value })}>
        <option value="">All Levels</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default Filter;
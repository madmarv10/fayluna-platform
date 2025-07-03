import React from "react";

const CategoryFilter = ({
  categories = [],
  selectedCategory = "",
  onCategorySelect = () => {},
  allLabel = "All",
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="category-filter" className="sr-only">
        Filter by category
      </label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => onCategorySelect(e.target.value)}
        className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="">{allLabel}</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;

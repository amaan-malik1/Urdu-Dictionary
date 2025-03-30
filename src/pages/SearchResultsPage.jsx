import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';

const SearchResultsPage = ({ dictionary }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const searchResults = useSearch(dictionary, query);

  // Get unique categories from search results
  const categories = [...new Set(
    searchResults.flatMap(word => word.categories)
  )].sort();

  // Filter and sort results
  const filteredResults = searchResults
    .filter(word =>
      filterCategory === 'all' ||
      word.categories.includes(filterCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'relevance') return 0; // Already sorted by relevance
      if (sortBy === 'alphabetical') return a.word.localeCompare(b.word);
      if (sortBy === 'roman') return a.roman.localeCompare(b.roman);
      return 0;
    });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 text-center">
          Found {filteredResults.length} results
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="relevance">Sort by Relevance</option>
          <option value="alphabetical">Sort by Urdu</option>
          <option value="roman">Sort by Roman</option>
        </select>
      </div>

      {filteredResults.length === 0 ? (
        <div className="text-center text-gray-600">
          No results found. Try a different search term or category.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((word) => (
            <Link
              to={`/word/${word.id}`}
              key={word.id}
              className="bg-white shadow-md rounded-lg p-4 
                hover:bg-blue-50 transition-colors"
            >
              <div className="text-right rtl:text-right">
                <h2 className="text-2xl font-bold mb-2">{word.word}</h2>
                <p className="text-gray-600 mb-2">{word.roman}</p>
                <div className="text-sm text-gray-500 mb-3">
                  {word.definitions[0]}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {word.categories.map((category, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {word.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
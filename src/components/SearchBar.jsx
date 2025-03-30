import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSuggestions } from '../utils/searchUtils';

const SearchBar = ({ dictionary }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (selectedWord = null) => {
    const searchTerm = selectedWord || query;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setQuery('');
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    setSuggestions(getSuggestions(dictionary, value));
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSearch(suggestions[selectedIndex].word);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto" ref={suggestionsRef}>
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search Urdu words..."
          className="w-full p-3 text-right rtl:text-right 
            border-2 border-blue-300 rounded-l-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => handleSearch()}
          className="bg-blue-500 text-white px-4 rounded-r-lg 
            hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white 
          border border-gray-200 rounded-b-lg shadow-lg max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              onClick={() => {
                setQuery(suggestion.word);
                handleSearch(suggestion.word);
              }}
              className={`p-3 hover:bg-blue-50 cursor-pointer 
                text-right rtl:text-right border-b last:border-b-0
                ${index === selectedIndex ? 'bg-blue-50' : ''}`}
            >
              <div className="font-bold text-lg">{suggestion.word}</div>
              <div className="text-gray-600 text-sm">{suggestion.roman}</div>
              <div className="text-gray-500 text-sm mt-1">
                {suggestion.definitions[0]}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestion.tags.slice(0, 2).map((tag, i) => (
                  <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
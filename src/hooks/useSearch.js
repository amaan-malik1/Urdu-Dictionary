import { useState, useMemo } from 'react';
import { fuzzySearch, sortByRelevance } from '../utils/searchUtils';

export const useSearch = (dictionary, query) => {
  // Memoized search results with sorting
  const searchResults = useMemo(() => {
    if (!query) return [];

    // Perform fuzzy search
    const matches = fuzzySearch(dictionary, query);

    // Sort results by relevance
    return sortByRelevance(matches, query);
  }, [dictionary, query]);

  return searchResults;
};

// Additional search-related hook
export const useSearchSuggestions = (dictionary, query) => {
  const [suggestions, setSuggestions] = useState([]);

  useMemo(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const matches = dictionary.filter(
      word =>
        word.word.includes(query) ||
        word.roman.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    setSuggestions(matches);
  }, [dictionary, query]);

  return suggestions;
};
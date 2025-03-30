// Advanced search functions

/**
 * Performs a fuzzy search on dictionary words
 * @param {Array} dictionary - Array of dictionary words
 * @param {string} query - Search query
 * @returns {Array} - Matched words
 */
export const fuzzySearch = (dictionary, query) => {
  if (!query) return [];

  const normalizedQuery = query.toLowerCase();

  return dictionary.filter((word) => {
    // Check multiple fields for match
    const matchWord = word.word.includes(query); // Keep original case for Urdu
    const matchRoman = word.roman.toLowerCase().includes(normalizedQuery);
    const matchDefinition = word.definitions.some(def =>
      def.toLowerCase().includes(normalizedQuery)
    );
    const matchTags = word.tags.some(tag =>
      tag.toLowerCase().includes(normalizedQuery)
    );
    const matchSynonyms = word.synonyms.some(synonym =>
      synonym.includes(query) // Keep original case for Urdu
    );

    return matchWord || matchRoman || matchDefinition || matchTags || matchSynonyms;
  });
};

/**
 * Sorts search results by relevance
 * @param {Array} results - Search results
 * @param {string} query - Original search query
 * @returns {Array} - Sorted results
 */
export const sortByRelevance = (results, query) => {
  return results.sort((a, b) => {
    const aScore = calculateRelevanceScore(a, query);
    const bScore = calculateRelevanceScore(b, query);
    return bScore - aScore;
  });
};

/**
 * Calculates relevance score for a word
 * @param {Object} word - Dictionary word
 * @param {string} query - Search query
 * @returns {number} - Relevance score
 */
const calculateRelevanceScore = (word, query) => {
  const normalizedQuery = query.toLowerCase();
  let score = 0;

  // Exact match gets highest score
  if (word.word === query) score += 100;
  if (word.roman.toLowerCase() === normalizedQuery) score += 90;

  // Prefix match
  if (word.word.startsWith(query)) score += 50;
  if (word.roman.toLowerCase().startsWith(normalizedQuery)) score += 40;

  // Contains match
  if (word.word.includes(query)) score += 30;
  if (word.roman.toLowerCase().includes(normalizedQuery)) score += 20;

  // Definition and tag matches
  word.definitions.forEach(def => {
    if (def.toLowerCase().includes(normalizedQuery)) score += 10;
  });

  word.tags.forEach(tag => {
    if (tag.toLowerCase().includes(normalizedQuery)) score += 5;
  });

  // Synonym matches
  word.synonyms.forEach(synonym => {
    if (synonym === query) score += 80;
    if (synonym.includes(query)) score += 15;
  });

  return score;
};

/**
 * Get suggested words based on input
 * @param {Array} dictionary - Dictionary words
 * @param {string} input - User input
 * @returns {Array} - Suggested words
 */
export const getSuggestions = (dictionary, input) => {
  if (!input) return [];

  const normalizedInput = input.toLowerCase();

  return dictionary
    .filter(word =>
      word.word.includes(input) || // Keep original case for Urdu
      word.roman.toLowerCase().includes(normalizedInput) ||
      word.synonyms.some(synonym => synonym.includes(input)) // Keep original case for Urdu
    )
    .slice(0, 5);
};
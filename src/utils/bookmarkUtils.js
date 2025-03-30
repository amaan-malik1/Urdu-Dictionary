const BOOKMARK_STORAGE_KEY = 'urdu_dictionary_bookmarks';

/**
 * Get all bookmarked words
 * @returns {Array} - Bookmarked words
 */
export const getBookmarks = () => {
  const bookmarks = localStorage.getItem(BOOKMARK_STORAGE_KEY);
  return bookmarks ? JSON.parse(bookmarks) : [];
};

/**
 * Add a word to bookmarks
 * @param {Object} word - Word to bookmark
 */
export const addBookmark = (word) => {
  const bookmarks = getBookmarks();
  const exists = bookmarks.some(bm => bm.id === word.id);
  
  if (!exists) {
    bookmarks.push(word);
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarks));
  }
};

/**
 * Remove a word from bookmarks
 * @param {string} wordId - ID of word to remove
 */
export const removeBookmark = (wordId) => {
  const bookmarks = getBookmarks();
  const updatedBookmarks = bookmarks.filter(bm => bm.id !== wordId);
  
  localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(updatedBookmarks));
};

/**
 * Check if a word is bookmarked
 * @param {string} wordId - ID of word to check
 * @returns {boolean} - Whether word is bookmarked
 */
export const isBookmarked = (wordId) => {
  const bookmarks = getBookmarks();
  return bookmarks.some(bm => bm.id === wordId);
};

/**
 * Clear all bookmarks
 */
export const clearBookmarks = () => {
  localStorage.removeItem(BOOKMARK_STORAGE_KEY);
};
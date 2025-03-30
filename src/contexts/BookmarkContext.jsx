import React, { createContext, useContext, useState } from 'react';

// Context creation
const BookmarkContext = createContext();

// Custom hook to use bookmarks
export const useBookmarks = () => {
  return useContext(BookmarkContext);
};

const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  // Add a bookmark
  const addBookmark = (word, meaning, example) => {
    const newBookmark = { id: Date.now(), word, meaning, example };
    setBookmarks((prev) => [...prev, newBookmark]);
  };

  // Remove a bookmark
  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  };

  // Clear all bookmarks
  const clearBookmarks = () => {
    setBookmarks([]);
  };

  // Check if a word is bookmarked
  const isBookmarked = (word) => {
    return bookmarks.some((bookmark) => bookmark.word === word);
  };

  // Toggle bookmark: add or remove
  const toggleBookmark = (wordObj) => {
    if (isBookmarked(wordObj.word)) {
      const bookmarkToRemove = bookmarks.find((bookmark) => bookmark.word === wordObj.word);
      if (bookmarkToRemove) removeBookmark(bookmarkToRemove.id);
    } else {
      addBookmark(wordObj.word, wordObj.meaning, wordObj.example);
    }
  };

  // Export bookmarks (Could be extended)
  const exportBookmarks = () => {
    const data = JSON.stringify(bookmarks);
    const blob = new Blob([data], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bookmarks.json';
    link.click();
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        clearBookmarks,  // <-- Added clearBookmarks here
        toggleBookmark,
        exportBookmarks,
        isBookmarked
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;

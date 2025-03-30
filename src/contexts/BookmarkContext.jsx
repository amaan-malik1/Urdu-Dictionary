import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the BookmarkContext
const BookmarkContext = createContext();

// Custom hook to use BookmarkContext
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

// BookmarkProvider Component
export const BookmarkProvider = ({ children }) => {
  // State to store bookmarked words
  const [bookmarks, setBookmarks] = useState(() => {
    // Initialize bookmarks from localStorage
    const savedBookmarks = localStorage.getItem('urduDictionaryBookmarks');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  // Effect to save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('urduDictionaryBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Function to add a bookmark
  const addBookmark = (word) => {
    // Prevent duplicate bookmarks
    if (!bookmarks.some(bookmark => bookmark.id === word.id)) {
      setBookmarks(prevBookmarks => [...prevBookmarks, word]);
    }
  };

  // Function to remove a bookmark
  const removeBookmark = (wordId) => {
    setBookmarks(prevBookmarks => 
      prevBookmarks.filter(bookmark => bookmark.id !== wordId)
    );
  };

  // Function to check if a word is bookmarked
  const isBookmarked = (wordId) => {
    return bookmarks.some(bookmark => bookmark.id === wordId);
  };

  // Function to toggle bookmark
  const toggleBookmark = (word) => {
    if (isBookmarked(word.id)) {
      removeBookmark(word.id);
    } else {
      addBookmark(word);
    }
  };

  // Function to clear all bookmarks
  const clearBookmarks = () => {
    setBookmarks([]);
  };

  // Context value with all bookmark-related functions
  const value = {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    clearBookmarks
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
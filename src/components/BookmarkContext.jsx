import React, { createContext, useState, useEffect } from 'react';

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem('urduDictBookmarks');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  useEffect(() => {
    localStorage.setItem('urduDictBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (word) => {
    setBookmarks((prevBookmarks) => {
      const isBookmarked = prevBookmarks.some((bm) => bm.id === word.id);
      
      if (isBookmarked) {
        return prevBookmarks.filter((bm) => bm.id !== word.id);
      } else {
        return [...prevBookmarks, word];
      }
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
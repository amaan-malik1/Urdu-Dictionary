import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Correct import for context in BookmarksPage.jsx
import { useBookmarks } from '../contexts/BookmarkContext'; // Correct path to the context


const BookmarksPage = () => {
  const { bookmarks, removeBookmark, clearBookmarks, exportBookmarks } = useBookmarks();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // Options: newest, oldest, alphabetical

  // Filter bookmarks based on search term
  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.word?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.meaning?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort bookmarks based on selected option
  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.word?.localeCompare(b.word);
    } else if (sortBy === 'oldest') {
      return a.id - b.id;
    } else { // newest
      return b.id - a.id;
    }
  });

  // Handle no bookmarks state
  if (bookmarks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 my-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Your Bookmarks</h1>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">You haven't saved any words yet.</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Return to Dictionary
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-blue-700">Your Bookmarks ({bookmarks.length})</h1>
        <div className="flex gap-2">
          <button
            onClick={exportBookmarks}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Export
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all bookmarks?')) {
                clearBookmarks();
              }
            }}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {sortedBookmarks.length === 0 ? (
        <p className="text-center py-4">No bookmarks match your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedBookmarks.map(bookmark => (
            <div key={bookmark.id} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-blue-800">{bookmark.word}</h2>
                  <p className="text-gray-700 mt-1">{bookmark.meaning}</p>
                  {bookmark.example && (
                    <p className="text-gray-600 italic mt-2">"{bookmark.example}"</p>
                  )}
                </div>
                <button
                  onClick={() => removeBookmark(bookmark.id)}
                  className="text-red-500 hover:text-red-700 transition"
                  aria-label="Remove bookmark"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="mt-3 text-right">
                <Link
                  to={`/word/${bookmark.id}`}
                  className="text-blue-600 hover:underline transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookmarkProvider from './contexts/BookmarkContext'; // Corrected import path
// import SearchBar from './components/SearchBar';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import WordDetailPage from './pages/WordDetailPage';
import BookmarksPage from './pages/BookmarksPage';

function App() {
  const [dictionary, setDictionary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/dictionary.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDictionary(data.words);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to load dictionary:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading Dictionary...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-600 p-4">
        <h2 className="text-xl font-bold mb-2">Error Loading Dictionary</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <BookmarkProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Urdu Dictionary</h1>
              <nav className="space-x-4">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/bookmarks" className="hover:underline">Bookmarks</Link>
              </nav>
            </div>
          </header>

          <main className="container mx-auto p-4">
            {/* <SearchBar dictionary={dictionary} /> */}

            <Routes>
              <Route path="/" element={<HomePage dictionary={dictionary} />} />
              <Route path="/search" element={<SearchResultsPage dictionary={dictionary} />} />
              <Route path="/word/:wordId" element={<WordDetailPage dictionary={dictionary} />} />
              <Route path="/bookmarks" element={<BookmarksPage dictionary={dictionary} />} />
            </Routes>
          </main>

          <footer className="bg-gray-200 p-4 text-center text-gray-600 mt-auto">
            <div className="container mx-auto">
              <p>© {new Date().getFullYear()} Urdu Dictionary</p>
            </div>
          </footer>
        </div>
      </Router>
    </BookmarkProvider>
  );
}

export default App;

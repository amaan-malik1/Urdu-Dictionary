import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import { BookmarkProvider } from './contexts/BookmarkContext';
import SearchBar from './components/SearchBar';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import WordDetailPage from './pages/WordDetailPage';

function App() {
  const [dictionary, setDictionary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/dictionary.json')
      .then(response => response.json())
      .then(data => {
        setDictionary(data.words);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to load dictionary:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading Dictionary...
      </div>
    );
  }

  return (
    <BookmarkProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-600 text-white p-4 text-center">
            <h1 className="text-2xl font-bold">Urdu Dictionary</h1>
          </header>

          <main className="container mx-auto p-4">
            <SearchBar dictionary={dictionary} />

            <Routes>
              <Route 
                path="/" 
                element={<HomePage dictionary={dictionary} />} 
              />
              <Route 
                path="/search" 
                element={<SearchResultsPage dictionary={dictionary} />} 
              />
              <Route 
                path="/word/:wordId" 
                element={<WordDetailPage dictionary={dictionary} />} 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </BookmarkProvider>
  );
}

export default App;
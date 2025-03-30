import React from 'react';
import { useParams } from 'react-router-dom';
// Correct import for context in WordDetailPage.jsx
import { useBookmarks } from '../contexts/BookmarkContext'; // Correct path to the context

const WordDetailPage = ({ dictionary }) => {
  const { wordId } = useParams();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Find the word in the dictionary
  const word = dictionary.find((w) => w.id === wordId);

  // If word not found, show error
  if (!word) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Word Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-6">
        {/* Word Header with Bookmark Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-right rtl:text-right">{word.word}</h1>
          <button
            onClick={() => toggleBookmark(word)}
            className={`px-4 py-2 rounded-full transition-colors ${isBookmarked(word.word)
              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {isBookmarked(word.word) ? '★ Bookmarked' : '☆ Bookmark'}
          </button>
        </div>

        {/* Word Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pronunciation and Roman */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Pronunciation</h2>
            <p className="text-gray-600">{word.pronunciation}</p>
            <p className="text-gray-600">{word.roman}</p>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {word.categories.map((category) => (
                <span
                  key={category}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Definitions Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Definitions</h2>
          <ul className="list-disc list-inside text-gray-700">
            {word.definitions.map((def, index) => (
              <li key={index} className="mb-2">{def}</li>
            ))}
          </ul>
        </div>

        {/* Examples and Synonyms Grid */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {/* Examples */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Examples</h2>
            <ul className="list-disc list-inside text-right rtl:text-right">
              {word.examples.map((example, index) => (
                <li key={index} className="mb-2">{example}</li>
              ))}
            </ul>
          </div>

          {/* Synonyms */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Synonyms</h2>
            <div className="flex flex-wrap gap-2">
              {word.synonyms.map((synonym) => (
                <span
                  key={synonym}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
                >
                  {synonym}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        {word.tags && word.tags.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {word.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordDetailPage;

import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BookmarkContext } from '../contexts/BookmarkContext';

const WordDetailPage = ({ dictionary }) => {
  const { wordId } = useParams();
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const word = dictionary.find((w) => w.id === wordId);

  if (!word) return <div>Word not found</div>;

  const isBookmarked = bookmarks.some((bm) => bm.id === word.id);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-right rtl:text-right">
            {word.word}
          </h1>
          <button
            onClick={() => toggleBookmark(word)}
            className={`p-2 rounded-full ${
              isBookmarked 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Pronunciation</h2>
            <p className="text-gray-600">{word.pronunciation}</p>
            <p className="text-gray-600">{word.roman}</p>
          </div>

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

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Definitions</h2>
          <ul className="list-disc list-inside text-gray-700">
            {word.definitions.map((def, index) => (
              <li key={index} className="mb-2">
                {def}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Examples</h2>
            <ul className="list-disc list-inside text-right rtl:text-right">
              {word.examples.map((example, index) => (
                <li key={index} className="mb-2">
                  {example}
                </li>
              ))}
            </ul>
          </div>

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
      </div>
    </div>
  );
};

export default WordDetailPage;
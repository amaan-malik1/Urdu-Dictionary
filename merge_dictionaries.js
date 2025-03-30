const fs = require('fs');
const path = require('path');

// Read both dictionary files
const mainDictionary = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'public/dictionary.json'), 'utf8')
);

const additionalDictionary = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'urdu_dictionary_entries.json'), 'utf8')
);

// Merge the words arrays
const mergedWords = [...mainDictionary.words, ...additionalDictionary.words];

// Create the merged dictionary
const mergedDictionary = {
    words: mergedWords
};

// Write the merged dictionary back to dictionary.json
fs.writeFileSync(
    path.join(__dirname, 'public/dictionary.json'),
    JSON.stringify(mergedDictionary, null, 2)
);

console.log('Dictionaries merged successfully!'); 
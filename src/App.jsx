import React, { useState, useEffect } from 'react';
import "./App.css";

function App() {
  const [scrambledWords, setScrambledWords] = useState([
    ["Iacs", "Hawk", "Soar"], // General words
    ["Derival", "Hinkle", "Cynar", "Dipetrio"] // STEM teacher words
  ]);

  const [currentWord, setCurrentWord] = useState("");
  const [score, setScore] = useState(0);
  const [genreIndex, setGenreIndex] = useState(0); // 0 for general, 1 for STEM teacher
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [scrambledWord, setScrambledWord] = useState(""); // Store scrambled word here

  // Function to scramble words (simple shuffling)
  const shuffleWord = (word) => {
    let shuffled;
    do {
      shuffled = word.toLowerCase().split('').sort(() => Math.random() - 0.5).join('');
    } while (shuffled === word.toLowerCase()); // Ensure the scrambled word is different from the original
    return shuffled;
  };
//AI help
  useEffect(() => {
    const wordToScramble = scrambledWords[genreIndex][currentWordIndex];
    setScrambledWord(shuffleWord(wordToScramble));
  }, [genreIndex, currentWordIndex, scrambledWords]);

  // Function to handle a correct guess
  const handleCorrectGuess = () => {
    setScore(score + 1); // Add one egg for correct answer
    setCurrentWordIndex(currentWordIndex + 1); // Move to next word in the current genre

    // Check if 3 words have been solved in the current genre
    if (currentWordIndex === 2) {
      setGenreIndex(genreIndex === 0 ? 1 : 0); // Switch to the next genre after 3 words
      setCurrentWordIndex(0); // Reset word index for next genre
    }
    setCurrentWord(""); // Reset the input
  };

  // Function to handle incorrect guess
  const handleIncorrectGuess = () => {
    alert("Try again!");
  };

  // The original unscrambled word for comparison
  const originalWord = scrambledWords[genreIndex][currentWordIndex];

  return (
    <div>
      <h1>Scrabble Type Game</h1>
      <p>Score: {score} eggs</p>
      <p>Current Genre: {genreIndex === 0 ? "School spirit" : "STEM Teacher"}</p>
      <h2>Unscramble the word: {scrambledWord}</h2>

      <input 
        type="text" 
        placeholder="Your guess" 
        onChange={(e) => setCurrentWord(e.target.value)} 
        value={currentWord}
      />
      <button
        onClick={() =>
          currentWord.toLowerCase() === originalWord.toLowerCase()
            ? handleCorrectGuess()
            : handleIncorrectGuess()
        }
      >
        Submit Guess
      </button>
    </div>
  );
}

export default App;
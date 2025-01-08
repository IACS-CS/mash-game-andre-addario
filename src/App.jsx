import React, { useState, useEffect } from 'react';  
import "./App.css";

function App() {
  
  const [scrambledWords, setScrambledWords] = useState([
    ["Iacs", "Hawk", "Soar"],  
    ["Derival", "Hinkle", "Cynar", "Dipietro"]  
  ]);

  // State variables
  const [userGuess, setUserGuess] = useState("");  // Holds the current guess from the user
  const [score, setScore] = useState(0);  // Score of the game, starts at 0
  const [currentGenre, setCurrentGenre] = useState(0);  // 0 = school spirit, 1 = STEM teacher
  const [currentWordIndex, setCurrentWordIndex] = useState(0);  // Index of the current word
  const [scrambledWord, setScrambledWord] = useState("");  // The word shown to the user after scrambling
  const [gameOver, setGameOver] = useState(false);  // Tracks whether the game is over or not

  
  const shuffleWord = (word) => {
    let scrambled;
    do {
      scrambled = word.toLowerCase().split('').sort(() => Math.random() - 0.5).join(''); // Shuffle the letters randomly
    } while (scrambled === word.toLowerCase()); // Keep shuffling until the word is different from the original
    return scrambled;
  };

  // This effect runs when the genre or word index changes to update the scrambled word
  useEffect(() => {
    if (gameOver) return;  // If the game is over, stop scrambling words

    const wordToScramble = scrambledWords[currentGenre][currentWordIndex];  // Get the word based on current genre and index
    setScrambledWord(shuffleWord(wordToScramble));  // Set the scrambled word for the user to guess
  }, [currentGenre, currentWordIndex, scrambledWords, gameOver]);

  // Function to handle the case when the user guesses the word correctly
  const handleCorrectGuess = () => {
    setScore(score + 1);  // Increase the score by 1 egg for a correct guess
    setCurrentWordIndex(currentWordIndex + 1);  // Move to the next word in the current genre

    // Check if all words in the current genre have been solved
    if (currentWordIndex === scrambledWords[currentGenre].length - 1) {
      if (currentGenre === 1) {
        setGameOver(true);  // If all words in both genres are solved, end the game
      } else {
        setCurrentGenre(1);  // Switch to the next genre (STEM Teacher) after finishing the current genre
        setCurrentWordIndex(0);  // Reset word index for the new genre
      }
    }
    setUserGuess("");  // Reset the input field for the next guess
  };

  // Function to handle the case when the user guesses incorrectly
  const handleIncorrectGuess = () => {
    alert("Try again!");  // Alert the user to try again if the guess is incorrect
  };

  // Get the original word (unscrambled) to compare with the user's guess
  const originalWord = scrambledWords[currentGenre][currentWordIndex];

  return (
    <div>
      <h1>Scrabble Type Game</h1>
     
      {gameOver ? (
        <div>
          <h2>Thank you for playing!</h2>
          <p>Your final score is {score} eggs.</p>
        </div>
      ) : (
        <div>
         
          <p>Score: {score} eggs</p>
          <p>Current Genre: {currentGenre === 0 ? "School Spirit" : "STEM Teacher"}</p>
          
          
          <h2>Unscramble the word: {scrambledWord}</h2>
          
    
          <input 
            type="text" 
            placeholder="Your guess" 
            onChange={(e) => setUserGuess(e.target.value)}  
            value={userGuess}
          />
          
       
          <button
            onClick={() =>
              userGuess.toLowerCase() === originalWord.toLowerCase()
                ? handleCorrectGuess()   
                : handleIncorrectGuess()  
            }
          >
            Submit Guess
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

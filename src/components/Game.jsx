import { useEffect } from "react";
import { useState } from "react";

export function Game() {
  const storedBestScore = JSON.parse(localStorage.getItem("best-score"));

  // ScoreBoard states
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    storedBestScore ? storedBestScore : 0
  );

  // Game states
  const [gameOver, setGameOver] = useState(false);

  //Card states
  const [deck, setDeck] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);

  // useEffect to increase score after each round
  useEffect(() => {
    if (!gameOver) {
      setScore((s) => s + 1);
    }
  }, [selectedCards, gameOver]);


  //   useEffect(() => {
  if (score > bestScore) {
    setBestScore(score);
  }
  //   }, [score, bestScore]);
  

  // Latest bestScore gets saved in localStorage
  useEffect(() => {
    localStorage.setItem("best-score", JSON.stringify(bestScore));
  }, [bestScore]);

  // Function to run when the user clicks on the card
  function handleCardClick(cardId) {
    if(selectedCards.includes(cardId)){
        setGameOver(true);
    } else {
        selectedCards.push(cardId);
    }
  }

  function getRandomCards(deck) {
    // Logic to shuffle the deck
  }


}

import { useEffect } from "react";
import { useState } from "react";
import sampleSize from "lodash.samplesize";

const API_KEY = import.meta.env.VITE_API_KEY;

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

  // Latest bestScore gets saved in localStorage every time it changes
  useEffect(() => {
    localStorage.setItem("best-score", JSON.stringify(bestScore));
  }, [bestScore]);

  // useEffect to fetch from the API
  useEffect(() => {}, [selectedCards]);

  // Function to run when the user clicks on the card
  function handleCardClick(cardId) {
    if (selectedCards.includes(cardId)) {
      setGameOver(true);
    } else {
      setSelectedCards([...selectedCards, cardId]);
      setScore((s) => s + 1);

      // See if this works, if it updates one lesser than score instead
      // of with score, then make sure to add this logic to a useEffect instead
      if (score > bestScore) {
        setBestScore(score);
      }
    }
  }

  // Function to get random cards from the deck
  function getRandomCards(deck) {
    return sampleSize(deck, 12);
  }
}

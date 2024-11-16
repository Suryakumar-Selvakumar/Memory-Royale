import { useEffect } from "react";
import { useState } from "react";
import sampleSize from "lodash.samplesize";

const JWT_TOKEN = import.meta.env.VITE_API_KEY;

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

  const apiUrl = "https://api.clashroyale.com/v1/cards";

  // Make the fetch request
  async function fetchCards() {
    try {
      const response = await fetch(apiUrl, {
        mode: "cors",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA5MzI0MmY0LTBjN2MtNGQxNy1iMzQ5LTRjZjg5ZmY3ODQ2MyIsImlhdCI6MTczMTcyOTI4MSwic3ViIjoiZGV2ZWxvcGVyLzVmYTUyNjc4LWMxM2QtNjkwMC1hY2IxLWViNTU2OTM4YjgzZiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0LjQuMTUzLjE4MiJdLCJ0eXBlIjoiY2xpZW50In1dfQ._YKtOajGNpwIQKje09xA5NZLbv6GuRh4zOZmHydf4UVDNLd_JZN-jfX59MSRKrRW_XoFsPvgxM2-Ojy7gF_9tw",
          },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  fetchCards();
  // useEffect to fetch from the API
  // useEffect(() => {
  //   const baseUrl = "https://api.clashroyale.com/v1/cards";
  //   const data = fetch(baseUrl, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${API_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //     mode: "no-cors",
  //   });
  // }, [selectedCards]);

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

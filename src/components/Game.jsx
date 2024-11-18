import { useEffect, useRef } from "react";
import { useState } from "react";
import { fetchCards } from "../services/api";
import { Card } from "./Card";
import { getRandomCards } from "../utils/arrayMethods";
import "../styles/Game.css";
import king from "../assets/King.png";

const apiToken = import.meta.env.VITE_API_KEY;
const apiUrl = "https://proxy.royaleapi.dev/v1/cards";

const allCards = (async () => await fetchCards(apiUrl, apiToken))();

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
  const [selectedCards, setSelectedCards] = useState([]);
  const [cards, setCards] = useState(null);
  const [cardsFlipped, setCardsFlipped] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [gameStartState, setGameStartState] = useState(true);

  // DOM Refs
  const cardsDiv = useRef(null);

  // Latest bestScore gets saved in localStorage every time it changes
  useEffect(() => {
    localStorage.setItem("best-score", JSON.stringify(bestScore));
  }, [bestScore]);

  // useEffect to fetch from the API
  useEffect(() => {
    (async () => {
      const cardsArray = await allCards;
      setCards(getRandomCards(cardsArray));
    })();

    setTimeout(() => {
      setGameStartState(false);
    }, 500);
  }, []);

  // useEffect to update cards at the end of a round
  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const cardsArray = await allCards;
        setCards(getRandomCards(cardsArray));
        setShowCard(true);
      })();
    }, 500);
    setTimeout(() => {
      setCardsFlipped(false);
    }, 750);
  }, [selectedCards]);

  // useEffect to update bestScore if new bestScore is obtained
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);
  // Function to run when the user clicks on the card
  function handleCardClick(cardId) {
    if (selectedCards.includes(cardId)) {
      setGameOver(true);
      setScore(0);
    } else {
      setSelectedCards([...selectedCards, cardId]);
      setScore((s) => s + 1);
      setCardsFlipped(true);
      setShowCard(false);
    }
  }

  return (
    <div className="game-page">
      <div className="king-div">{gameOver ? "Game Over" : "Round Won"}</div>
      {cards && (
        <div className="cards" ref={cardsDiv}>
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleCardClick={handleCardClick}
              cardsFlipped={cardsFlipped}
              showCard={showCard}
              gameStartState={gameStartState}
            />
          ))}
        </div>
      )}
      <div className="score-board-div">
        <p>Best Score: {bestScore}</p>
        <p>Score: {score}</p>
      </div>
    </div>
  );
}

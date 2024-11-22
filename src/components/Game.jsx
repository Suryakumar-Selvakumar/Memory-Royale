import { useEffect, useRef } from "react";
import { useState } from "react";
import { Card } from "./Card";
import { getRandomCards } from "../utils/arrayMethods";
import "../styles/Game.css";
import king from "../assets/icons/King-Image.png";
import { setKingEmote } from "../utils/kingImageSetter";
import royalBackground from "../assets/backgrounds/Game-Background.jpg";
import soundOn from "../assets/svg/sound-on.svg";
import soundOff from "../assets/svg/sound-off.svg";
import musicOn from "../assets/svg/music-on.svg";
import musicOff from "../assets/svg/music-off.svg";
import exit from "../assets/svg/exit.svg";
import question from "../assets/svg/question.svg";
import kingToolTip from "../assets/icons/King-Tool-Tip.png";

export function Game({ allCards, setCurrentPage }) {
  const storedBestScore = JSON.parse(localStorage.getItem("best-score"));

  // ScoreBoard states
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    storedBestScore ? storedBestScore : 0
  );

  // Game states
  const [gameOver, setGameOver] = useState(false);
  const [showKingEmote, setShowKingEmote] = useState(false);
  const [gameStartState, setGameStartState] = useState(true);
  const [showToolTip, setShowToolTip] = useState(false);

  //Card states
  const [selectedCards, setSelectedCards] = useState([]);
  const [cards, setCards] = useState(null);
  const [cardsFlipped, setCardsFlipped] = useState(false);
  const [showCard, setShowCard] = useState(false);

  // DOM Refs
  const cardsDiv = useRef(null);

  // Latest bestScore gets saved in localStorage every time it changes
  useEffect(() => {
    localStorage.setItem("best-score", JSON.stringify(bestScore));
  }, [bestScore]);

  // useEffect to fetch from the API
  useEffect(() => {
    setTimeout(() => setShowKingEmote(true), 250);

    (async () => {
      const cardsArray = await allCards;
      setCards(getRandomCards(cardsArray));
    })();

    setTimeout(() => {
      setShowKingEmote(false);
      setGameStartState(false);
    }, 4250);
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
    setTimeout(() => setCardsFlipped(false), 750);

    setTimeout(() => {
      if (!gameStartState) setShowKingEmote(false);
    }, 1000);
  }, [selectedCards, gameStartState, allCards]);

  // useEffect to update bestScore if new bestScore is obtained
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  // Function to run when the user clicks on the card
  function handleCardClick(cardId) {
    setShowKingEmote(true);

    if (selectedCards.includes(cardId)) {
      setGameOver(true);
      setScore(0);

      setTimeout(() => {
        // Game Reset Logic, probably port it to Restart modal if you make it
        setShowKingEmote(false);
        setGameOver(false);

        setCardsFlipped(true);

        setTimeout(() => {
          setGameStartState(true);
          setShowKingEmote(true);
          setSelectedCards([]);
        }, 1250);

        setTimeout(() => {
          setShowKingEmote(false);
          setGameStartState(false);
        }, 5500);
      }, 1000);
    } else {
      setSelectedCards([...selectedCards, cardId]);
      setScore((s) => s + 1);
      setCardsFlipped(true);
      setShowCard(false);
    }
  }

  return (
    <div
      className="game-page"
      style={{
        background: `url(${royalBackground}) no-repeat`,
        backgroundSize: "100vw 100vh",
      }}
    >
      <div className="king-div">
        <img
          src={setKingEmote(score, bestScore, gameOver, gameStartState)}
          alt="King's emote"
          className={showKingEmote ? "king-emote visible" : "king-emote"}
        />
        <img src={king} id="king" alt="Clash Royale King" />
      </div>
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
              gameOver={gameOver}
            />
          ))}
        </div>
      )}

      {cards && (
        <div className="right-side">

          <div className="score-board-div">
            <p>Best Score: {bestScore}</p>
            <p>Score: {score}</p>
          </div>

          <div className="app-btns">
            <div className="sound-btns">
              <img className="app-svgs" src={soundOn} alt="sound on button" />
              <img className="app-svgs" src={musicOn} alt="music on button" />
            </div>
            <img
              className="app-svgs"
              src={question}
              alt="sound on button"
              onClick={() => setShowToolTip(!showToolTip)}
            />
            <div className={showToolTip ? "tool-tip visible" : "tool-tip"}>
              <p>Don't click on the same card twice!</p>
              <img
                src={kingToolTip}
                id="king-tool-tip"
                alt="Clash Royale king pointing up icon"
              />
            </div>

            <img
              className="app-svgs"
              src={exit}
              alt="exit button"
              onClick={() => setCurrentPage("home")}
            />
          </div>
        </div>
      )}
    </div>
  );
}

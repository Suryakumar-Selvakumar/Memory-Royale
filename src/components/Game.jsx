import { useEffect, useRef } from "react";
import { useState } from "react";
import { Card } from "./Card";
import { getRandomCards } from "../utils/arrayMethods";
import "../styles/Game.css";
import king from "../assets/icons/King-Image.png";
import { setKingEmote, setKingEmoteSound } from "../utils/kingEmoteSetter";
import background from "../assets/backgrounds/Game-Background.jpg";
import soundOn from "../assets/svg/sound-on.svg";
import soundOff from "../assets/svg/sound-off.svg";
import musicOn from "../assets/svg/music-on.svg";
import musicOff from "../assets/svg/music-off.svg";
import exit from "../assets/svg/exit.svg";
import question from "../assets/svg/question.svg";
import kingToolTip from "../assets/icons/King-Tool-Tip.png";
import cross from "../assets/svg/cross.svg";
import kingBookSound from "../assets/sounds/emote sounds/King-Book-Sound.mp3";
import cardsPlaceAudio from "../assets/sounds/Cards-Place-Audio.mp3";

export function Game({ allCards, setCurrentPage, gameMusic, btnSound }) {
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
  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(min-width: 360px) and (max-width: 1700px)").matches
  );

  // Sound states
  const storedGameSound = JSON.parse(localStorage.getItem("game-sound"));
  const [gameSound, setGameSound] = useState(
    storedGameSound !== undefined ? storedGameSound : true
  );
  const storedGameVolume = JSON.parse(localStorage.getItem("game-volume"));
  const [gameVolume, setGameVolume] = useState(
    storedGameVolume !== undefined ? storedGameVolume : true
  );
  const [emoteSound, setEmoteSound] = useState(null);

  //Card states
  const [selectedCards, setSelectedCards] = useState([]);
  const [cards, setCards] = useState(null);
  const [cardsFlipped, setCardsFlipped] = useState(false);
  const [showCard, setShowCard] = useState(false);

  // DOM Refs
  const cardsDiv = useRef(null);
  const gamePageRef = useRef(null);

  // Latest bestScore gets saved in localStorage every time it changes
  useEffect(() => {
    localStorage.setItem("best-score", JSON.stringify(bestScore));
  }, [bestScore]);

  // UseEffect to add gameSound to localStorage
  useEffect(() => {
    localStorage.setItem("game-sound", JSON.stringify(gameSound));
  }, [gameSound]);

  // UseEffect to add gameVolume to localStorage
  useEffect(() => {
    localStorage.setItem("game-volume", JSON.stringify(gameVolume));
  }, [gameVolume]);

  // useEffect to fetch from the API
  useEffect(() => {
    setShowKingEmote(true);

    (async () => {
      const cardsArray = await allCards;
      setCards(getRandomCards(cardsArray));
    })();

    setTimeout(() => {
      setShowKingEmote(false);
      setGameStartState(false);
    }, 4000);

    const mediaQuery = window.matchMedia(
      "(min-width: 360px) and (max-width: 1700px)"
    );

    const handleMediaChange = (event) => {
      setIsMobileView(event.matches);

      if (!event.matches) {
        // scroll to top when going back to PC layout
        window.scrollTo(0, 0);
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // useEffect to update cards at the end of a round
  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const cardsArray = await allCards;
        setCards(getRandomCards(cardsArray, 12));
        setShowCard(true);
      })();
    }, 500);
    setTimeout(() => setCardsFlipped(false), 750);

    setTimeout(() => {
      if (!gameStartState) setShowKingEmote(false);
    }, 1000);
  }, [selectedCards, allCards]);

  // useEffect to update bestScore if new bestScore is obtained
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  // Function to run when the user clicks on the card
  function handleCardClick(cardId) {
    setShowKingEmote(true);
    setEmoteSound(setKingEmoteSound(score, gameOver));

    if (selectedCards.includes(cardId)) {
      setGameOver(true);
      setScore(0);

      setTimeout(() => {
        // Game Reset Logic
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
    <>
      {gameSound && <audio src={gameMusic} loop={true} autoPlay={true}></audio>}
      {showKingEmote && !gameStartState && !gameOver && (
        <audio src={emoteSound} autoPlay={true}></audio>
      )}
      {gameOver && (
        <audio src={setKingEmoteSound(score, gameOver)} autoPlay={true}></audio>
      )}
      {showKingEmote && gameStartState && (
        <audio src={kingBookSound} autoPlay={true} loop={true}></audio>
      )}
      {gameStartState && (
        <audio src={cardsPlaceAudio} autoPlay={true}></audio>
      )}

      <div
        className="game-page"
        ref={gamePageRef}
        style={{
          background: `url(${!isMobileView && background})`,
          backgroundSize: !isMobileView && "cover",
        }}
      >
        {!isMobileView && (
          <div className="king-div">
            <img
              src={setKingEmote(score, gameOver, gameStartState)}
              alt="King's emote"
              className={showKingEmote ? "king-emote visible" : "king-emote"}
            />
            {!isMobileView && (
              <img src={king} id="king" alt="Clash Royale King" />
            )}
          </div>
        )}
        {cards && !isMobileView && (
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
        {!isMobileView ? (
          <div className="right-side">
            {cards && (
              <>
                <div className="score-board-div">
                  <p>Best Score: {bestScore}</p>
                  <p>Score: {score}</p>
                </div>

                <div className="app-btns">
                  <div className="btn-svgs">
                    <img
                      className="app-svgs"
                      src={gameVolume ? soundOn : soundOff}
                      alt="sound on button"
                      onClick={() => {
                        setGameVolume(!gameVolume);
                        gameVolume && btnSound();
                      }}
                    />
                    <img
                      className="app-svgs"
                      src={gameSound ? musicOn : musicOff}
                      alt="music on button"
                      onClick={() => {
                        setGameSound(!gameSound);
                        gameVolume && btnSound();
                      }}
                    />
                    <img
                      className="app-svgs"
                      src={!showToolTip ? question : cross}
                      alt="tool-tip button"
                      onClick={() => {
                        setShowToolTip(!showToolTip);
                        gameVolume && btnSound();
                      }}
                    />
                    <img
                      className="app-svgs"
                      src={exit}
                      alt="exit button"
                      onClick={() => {
                        setCurrentPage("intro");
                        gameVolume && btnSound();
                      }}
                    />
                  </div>
                  <div
                    className={showToolTip ? "tool-tip visible" : "tool-tip"}
                  >
                    <p>Don't click on the same card twice!</p>
                    <img
                      src={kingToolTip}
                      id="king-tool-tip"
                      alt="Clash Royale king pointing up icon"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            {cards && (
              <>
                <div className="score-board-div">
                  <p>Best Score: {bestScore}</p>
                  <p>Score: {score}</p>
                </div>
                <div className="king-div">
                  <img
                    src={setKingEmote(score, gameOver, gameStartState)}
                    alt="King's emote"
                    className={
                      showKingEmote ? "king-emote visible" : "king-emote"
                    }
                  />
                  {!isMobileView && (
                    <img src={king} id="king" alt="Clash Royale King" />
                  )}
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
                <div className="app-btns">
                  <div className="btn-svgs">
                    <div>
                      <img
                        className="app-svgs"
                        src={gameVolume ? soundOn : soundOff}
                        alt="sound on button"
                        onClick={() => {
                          setGameVolume(!gameVolume);
                          gameVolume && btnSound();
                        }}
                      />
                      <img
                        className="app-svgs"
                        src={gameSound ? musicOn : musicOff}
                        alt="music on button"
                        onClick={() => {
                          setGameSound(!gameSound);
                          gameVolume && btnSound();
                        }}
                      />
                    </div>
                    <div>
                      <img
                        className="app-svgs"
                        src={!showToolTip ? question : cross}
                        alt="tool-tip button"
                        onClick={() => {
                          setShowToolTip(!showToolTip);
                          gameVolume && btnSound();
                        }}
                      />
                      <img
                        className="app-svgs"
                        src={exit}
                        alt="exit button"
                        onClick={() => {
                          setCurrentPage("intro");
                          gameVolume && btnSound();
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={
                    showToolTip ? "tool-tip-game visible" : "tool-tip-game"
                  }
                >
                  <p>Don't click on the same card twice!</p>
                  <img
                    src={kingToolTip}
                    id="king-tool-tip-game"
                    alt="Clash Royale king pointing up icon"
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

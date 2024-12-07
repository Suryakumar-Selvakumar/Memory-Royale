import "../styles/Home.css";
import magicItems from "../assets/icons/Magic-Items-Icon.png";
import crownIcon from "../assets/icons/Crown-Icon.png";
import background from "../assets/backgrounds/Game-Background.jpg";
import soundOn from "../assets/svg/sound-on.svg";
import soundOff from "../assets/svg/sound-off.svg";
import musicOn from "../assets/svg/music-on.svg";
import musicOff from "../assets/svg/music-off.svg";
import question from "../assets/svg/question.svg";
import cross from "../assets/svg/cross.svg";
import kingToolTip from "../assets/icons/King-Tool-Tip.png";
import { useEffect, useState } from "react";

export function Home({
  setCurrentPage,
  setFirstLoad,
  playBtnSound,
  homeMusic,
  btnSound,
  homeIntroSound,
}) {
  const [showToolTip, setShowToolTip] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  // Game Sounds
  const storedGameSound = JSON.parse(localStorage.getItem("game-sound"));
  const [gameSound, setGameSound] = useState(
    storedGameSound !== undefined ? storedGameSound : true
  );

  const storedGameVolume = JSON.parse(localStorage.getItem("game-volume"));
  const [gameVolume, setGameVolume] = useState(
    storedGameVolume !== undefined ? storedGameVolume : true
  );

  useEffect(() => {
    setTimeout(() => setShowAnimation(false), 1500);
    const emoteSoundAudioTag = document.querySelector(".emote-sound");
    if (emoteSoundAudioTag) emoteSoundAudioTag.volume = 0.75;
  }, []);

  // UseEffect to add gameSound to localStorage
  useEffect(() => {
    localStorage.setItem("game-sound", JSON.stringify(gameSound));
  }, [gameSound]);

  // UseEffect to add gameVolume to localStorage
  useEffect(() => {
    localStorage.setItem("game-volume", JSON.stringify(gameVolume));
  }, [gameVolume]);

  function startGame() {
    gameVolume && playBtnSound();

    setTimeout(() => {
      if (!showAnimation) {
        setFirstLoad(false);
        setCurrentPage("loading");
      }
    }, 1750);
  }

  const mediaQuery = window.matchMedia(
    "(min-width: 360px) and (max-width: 1700px)"
  );

  return (
    <div
      className="home-page"
      style={{
        background: `url(${!mediaQuery.matches && background})`,
        backgroundSize: !mediaQuery.matches && "cover",
      }}
    >
      <audio
        src={homeIntroSound}
        autoPlay={true}
        className="intro-sound"
      ></audio>
      {gameSound && <audio src={homeMusic} loop={true} autoPlay={true}></audio>}
      <div
        className={showAnimation ? "logo-container start" : "logo-container"}
      >
        <img src={magicItems} id="magic-items" alt="an icon of magic items" />
        <div>
          <p className="logo">MEMORY</p>
          <p className="logo">ROYALE</p>
        </div>
        <img id="crown-icon" src={crownIcon} alt="a books icon" />
      </div>
      <div className="app-btns">
        <button
          className={
            showAnimation
              ? "btn btn-shadow btn-shadow--orange btn-pushable start"
              : "btn btn-shadow btn-shadow--orange btn-pushable"
          }
          onClick={() => startGame()}
        >
          <span>Play</span>
        </button>
        <div className={showAnimation ? "btn-svgs start" : "btn-svgs"}>
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
        </div>
        <div className={showToolTip ? "tool-tip visible" : "tool-tip"}>
          <p>Don't click on the same card twice!</p>
          <img
            src={kingToolTip}
            id="king-tool-tip"
            alt="Clash Royale king pointing up icon"
          />
        </div>
      </div>
    </div>
  );
}

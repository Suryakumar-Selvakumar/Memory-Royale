import "../styles/Home.css";
import magicItems from "../assets/icons/Magic-Items-Icon.png";
import crownIcon from "../assets/icons/Crown-Icon.png";
import background from "../assets/backgrounds/Game-Background.jpg";
import soundOn from "../assets/svg/sound-on.svg";
import soundOff from "../assets/svg/sound-off.svg";
import musicOn from "../assets/svg/music-on.svg";
import musicOff from "../assets/svg/music-off.svg";
import question from "../assets/svg/question.svg";
import kingToolTip from "../assets/icons/King-Tool-Tip.png";
import { useState } from "react";

export function Home({ setCurrentPage }) {
  const [showToolTip, setShowToolTip] = useState(false);

  function startGame() {
    setTimeout(() => setCurrentPage("loading"), 500);
  }

  return (
    <div
      className="home-page"
      style={{
        background: `url(${background})`,
        backgroundSize: "100vw 100vh",
      }}
    >
      <div className="app-name">
        <div className="logo-container">
          <div className="icons">
            <img
              src={magicItems}
              id="magic-items"
              alt="an icon of magic items"
            />
          </div>
          <div className="logo-name">
            <p className="logo">MEMORY</p>
            <p className="logo">ROYALE</p>
          </div>
          <img id="crown-icon" src={crownIcon} alt="a books icon" />
        </div>
        <button
          className="btn btn-shadow btn-shadow--orange btn-pushable"
          onClick={() => startGame()}
        >
          <span>Play</span>
        </button>
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
      </div>
    </div>
  );
}

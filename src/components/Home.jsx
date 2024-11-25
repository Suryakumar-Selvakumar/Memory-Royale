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
import { useEffect, useState } from "react";

export function Home({ setCurrentPage }) {
  const [showToolTip, setShowToolTip] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowAnimation(false), 1500);
  }, []);

  function startGame() {
    setTimeout(() => {
      if (!showAnimation) setCurrentPage("loading");
    }, 500);
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
        <div className={showAnimation? "btn-svgs start" : "btn-svgs"}>
          <img className="app-svgs" src={soundOn} alt="sound on button" />
          <img className="app-svgs" src={musicOn} alt="music on button" />
          <img
            className="app-svgs"
            src={question}
            alt="sound on button"
            onClick={() => setShowToolTip(!showToolTip)}
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

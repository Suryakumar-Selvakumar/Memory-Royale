import "../styles/Loading.css";
import background from "../assets/backgrounds/Game-Background.jpg";
import magicItems from "../assets/icons/Magic-Items-Icon.png";
import crownIcon from "../assets/icons/Crown-Icon.png";
import { useEffect, useRef, useState } from "react";

export function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setProgress((prevprog) => {
          if (prevprog < 100) {
            return prevprog + 2;
          } else {
            clearInterval(interval);
            return prevprog;
          }
        }),
      100
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="loading-page"
      style={{
        background: `url(${background})`,
        backgroundSize: "100vw 100vh",
      }}
    >
      <div className="app-name">
        <div className="icons">
          <img src={magicItems} id="magic-items" alt="an icon of magic items" />
        </div>
        <div className="logo-container">
          <p className="logo">MEMORY</p>
          <p className="logo">ROYALE</p>
        </div>
        <img id="crown-icon" src={crownIcon} alt="a books icon" />
      </div>
      <div className="loading-div">
        <span id="progress">{progress}%</span>
        <div className="loading-wrapper">
          <span id="loader"></span>
        </div>
      </div>
    </div>
  );
}

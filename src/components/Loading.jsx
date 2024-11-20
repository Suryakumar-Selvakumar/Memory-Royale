import "../styles/Loading.css";
import background from "../assets/backgrounds/Game-Background.jpg";
import { useEffect, useRef, useState } from "react";

export function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setProgress((prevprog) => {
          if (prevprog < 100) {
            return prevprog + 1;
          } else {
            clearInterval(interval);
            return prevprog;
          }
        }),
      50
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
      <div className="loading-div">
        <span id="progress">{progress}%</span>
        <div className="loading-wrapper">
          <span id="loader"></span>
        </div>
      </div>
    </div>
  );
}

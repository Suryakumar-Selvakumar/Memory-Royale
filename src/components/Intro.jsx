import { useEffect, useRef, useState } from "react";
import "../styles/Intro.css";

export function Intro({ setCurrentPage, setFirstLoad, play, introSound }) {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    setFirstLoad(true);
    setTimeout(() => setShowLogo(true), 1000);

    setTimeout(() => {
      setShowLogo(false);
      setCurrentPage("loading");
    }, 3500);
  }, []);

  return (
    <>
      <div className="intro-page" style={{ backgroundColor: "black" }}>
        {showLogo && <audio src={introSound} autoPlay={true}></audio>}
        <div className={showLogo ? "intro-logo start" : "intro-logo"}>
          <p>SUP</p>
          <p>ERC</p>
          <p className="last-logo-line">
            <span>E</span>
            <span>L</span>
            <span>L</span>
          </p>
        </div>
      </div>
    </>
  );
}

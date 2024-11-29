import { useEffect, useState } from "react";
import "../styles/Intro.css";

export function Intro({ setCurrentPage }) {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLogo(false);
      //   setCurrentPage("loading");
    }, 3000);
  }, []);

  return (
    <div className="intro-page" style={{ backgroundColor: "black" }}>
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
  );
}

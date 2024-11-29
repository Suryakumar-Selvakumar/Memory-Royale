import { useEffect } from "react";
import "../styles/Intro.css";

export function Intro(setCurrentPage) {
  useEffect(() => {
    setTimeout(() => {setCurrentPage("loading")}, 2000);
  }, []);

  return (
    <div className="intro-page">
      <div className="intro-logo">
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

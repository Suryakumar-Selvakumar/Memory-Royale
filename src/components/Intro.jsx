import { useEffect } from "react";

export function Intro(setCurrentPage) {
  useEffect(() => {
    setTimeout(() => setCurrentPage("loading"), 2000);
  }, []);

  return (
    <div className="intro-page">
      <div className="intro-logo">
        <p>SUP</p>
        <p>ERC</p>
        <p>ELL</p>
      </div>
    </div>
  );
}

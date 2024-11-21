import "../styles/Home.css";
import magicItems from "../assets/icons/Magic-Items-Icon.png";
import crownIcon from "../assets/icons/Crown-Icon.png";
import background from "../assets/backgrounds/Game-Background.jpg";

export function Home({ setCurrentPage }) {
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
        <div className="icons">
          <img src={magicItems} id="magic-items" alt="an icon of magic items" />
        </div>
        <div className="logo-container">
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
  );
}

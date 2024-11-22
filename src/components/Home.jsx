import "../styles/Home.css";
import magicItems from "../assets/icons/Magic-Items-Icon.png";
import crownIcon from "../assets/icons/Crown-Icon.png";
import background from "../assets/backgrounds/Game-Background.jpg";
import soundOn from "../assets/svg/sound-on.svg";
import soundOff from "../assets/svg/sound-off.svg";
import musicOn from "../assets/svg/music-on.svg";
import musicOff from "../assets/svg/music-off.svg";
import question from "../assets/svg/question.svg";

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
      <div className="left-side-icons">
        <img className="app-svgs" src={question} alt="sound on button" />
      </div>
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
      <div className="right-side-icons">
        <img className="app-svgs" src={soundOn} alt="sound on button" />
        <img className="app-svgs" src={musicOn} alt="music on button" />
      </div>
    </div>
  );
}

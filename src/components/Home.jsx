import "../styles/Home.css";
import background from "../assets/King-Background-3.png";
import homeBackground from "../assets/Home-Background-6.png";
import booksIcon from "../assets/Books-Icon.png";
import starIconGold from "../assets/Star-Gold-Icon.png";
import magicItems from "../assets/Magic-Items-Icon.png";
import cardsIcon from "../assets/Cards-Icon.png";
import cardsDraftIcon from "../assets/Cards-Draft-Icon.png";
import cardsSwapIcon from "../assets/Cards-Swap-Icon.png";
import crownIcon from "../assets/Crown-Icon.png";
import royaleText from "../assets/Royale.png";

export function Home() {
  return (
    <div className="home-page">
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
      <button className="btn btn-shadow btn-shadow--orange">
        <span>Play</span>
      </button>
    </div>
  );
}

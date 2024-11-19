import "../styles/Home.css";
import background from "../assets/King-Background-1.jpg";
import homeBackground from "../assets/Home-Background-5.png";

export function Home() {
  return (
    <div
      style={{
        background: `url(${homeBackground}) no-repeat`,
        backgroundSize: "100vw 110vh",
      }}
      className="home-page"
    >
      <p className="logo">Memory</p>
      <p className="logo">Royale</p>
    </div>
  );
}

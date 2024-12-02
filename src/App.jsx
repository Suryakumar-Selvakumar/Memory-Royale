import { useState } from "react";
import { Game } from "./components/Game";
import "./styles/App.css";
import { Home } from "./components/Home";
import { Loading } from "./components/Loading";
import { fetchCards } from "./services/api";
import { Intro } from "./components/Intro";
import gameMusic from "./assets/sounds/Game-Music.mp3";
import useSound from "use-sound";
import introSound from "./assets/sounds/Intro-Sound.mp3";
import introLoadingSound from "./assets/sounds/Intro-Loading-Sound.mp3";
import gameLoadingSound from "./assets/sounds/Game-Loading-Sound.mp3";
import playSound from "./assets/sounds/Play-Sound.mp3";
import homeMusic from "./assets/sounds/Home-Music.mp3";

const apiToken = import.meta.env.VITE_API_KEY;
const apiUrl = "https://proxy.royaleapi.dev/v1/cards";

const allCards = (async () => await fetchCards(apiUrl, apiToken))();

function App() {
  const [currentPage, setCurrentPage] = useState("intro");
  const [firstLoad, setFirstLoad] = useState(false);
  const [playBtnSound] = useSound(playSound);

  return (
    <>
      {currentPage === "intro" && (
        <Intro
          setCurrentPage={setCurrentPage}
          setFirstLoad={setFirstLoad}
          introSound={introSound}
        />
      )}
      {currentPage === "home" && (
        <Home
          setCurrentPage={setCurrentPage}
          setFirstLoad={setFirstLoad}
          playBtnSound={playBtnSound}
          homeMusic={homeMusic}
        />
      )}
      {currentPage === "loading" && (
        <Loading
          setCurrentPage={setCurrentPage}
          firstLoad={firstLoad}
          introLoadingSound={introLoadingSound}
          gameLoadingSound={gameLoadingSound}
        />
      )}
      {currentPage === "game" && (
        <Game
          setCurrentPage={setCurrentPage}
          allCards={allCards}
          gameMusic={gameMusic}
        />
      )}
    </>
  );
}

export default App;

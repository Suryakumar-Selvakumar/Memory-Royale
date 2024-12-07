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
import buttonSound from "./assets/sounds/Button-Sound.mp3";
import homeIntroSound from "./assets/sounds/Home-Intro-Sound.mp3";

const apiToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU5NjgyNGQwLWFkMTktNDdiYy1hYWU4LTNhYTNlNzRjMzI1NSIsImlhdCI6MTczMTc4ODU4NCwic3ViIjoiZGV2ZWxvcGVyLzVmYTUyNjc4LWMxM2QtNjkwMC1hY2IxLWViNTU2OTM4YjgzZiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.LNRuMIMQmv4AeJhz5qK_UYGjxg5_QThUD073SZCYIE1K2isUlPBQ6s-1T5KlTYWMxUyyC5MmVBLauh5tcH1xwg";
const apiUrl = "https://proxy.royaleapi.dev/v1/cards";

const allCards = (async () => await fetchCards(apiUrl, apiToken))();

function App() {
  const [currentPage, setCurrentPage] = useState("intro");
  const [firstLoad, setFirstLoad] = useState(false);
  const [playBtnSound] = useSound(playSound, { volume: 0.75 });
  const [btnSound] = useSound(buttonSound);

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
          btnSound={btnSound}
          homeIntroSound={homeIntroSound}
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
          btnSound={btnSound}
        />
      )}
    </>
  );
}

export default App;

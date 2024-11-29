import { useState } from "react";
import { Game } from "./components/Game";
import "./styles/App.css";
import { Home } from "./components/Home";
import { Loading } from "./components/Loading";
import { fetchCards } from "./services/api";
import { Intro } from "./components/Intro";

const apiToken = import.meta.env.VITE_API_KEY;
const apiUrl = "https://proxy.royaleapi.dev/v1/cards";

const allCards = (async () => await fetchCards(apiUrl, apiToken))();

function App() {
  const [currentPage, setCurrentPage] = useState("intro");
  const [firstLoad, setFirstLoad] = useState(false);

  return (
    <>
      {currentPage === "intro" && (
        <Intro setCurrentPage={setCurrentPage} setFirstLoad={setFirstLoad} />
      )}
      {currentPage === "home" && (
        <Home setCurrentPage={setCurrentPage} setFirstLoad={setFirstLoad} />
      )}
      {currentPage === "loading" && (
        <Loading setCurrentPage={setCurrentPage} firstLoad={firstLoad} />
      )}
      {currentPage === "game" && (
        <Game setCurrentPage={setCurrentPage} allCards={allCards} />
      )}
    </>
  );
}

export default App;

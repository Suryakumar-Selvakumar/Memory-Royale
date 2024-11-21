import { useState } from "react";
import { Game } from "./components/Game";
import "./styles/App.css";
import { Home } from "./components/Home";
import { Loading } from "./components/Loading";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <main>
      {currentPage === "home" && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === "loading" && <Loading setCurrentPage={setCurrentPage} />}
      {currentPage === "game" && <Game setCurrentPage={setCurrentPage} />}
    </main>
  );
}

export default App;

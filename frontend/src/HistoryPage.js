import React, { useState, useEffect } from "react";

function HistoryPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <div>
      <div id="centerBox">
        <div><h2 className="title">Historial</h2></div>
        <div id="box">
          {games.map((game) => (
            <div key={game.id}>
              <h1 className="subTitle">Partida {game.id}</h1>
              <p class="subTitleMedium"><span style={{color: "#1764c8"}}>Jugador:</span> {game.name}</p>
              <p class="subTitleMedium"><span style={{color: "#1764c8"}}>Preguntas Acertadas:</span> {game.won}</p>
              <p class="subTitleMedium"><span style={{color: "#1764c8"}}>Preguntas Falladas:</span> {game.lose}</p>
              <p class="subTitleMedium"><span style={{color: "#1764c8"}}>¿Ganó? </span> {game.state ? 'Si' : 'No'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;

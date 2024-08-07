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
        <h1 className="title">Historial</h1>
        <ul>
          {games.map((game, index) => (
            <div key={index}> 
              <p>Partida {game.id}</p>
              <p>Jugador: {game.name}</p>
              <p>Preguntas Acertadas: {game.win}</p>
              <p>Preguntas Perdidas: {game.lose}</p>
              <p>¿Ganó?: {game.state}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HistoryPage;

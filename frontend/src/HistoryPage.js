import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function HistoryPage() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  //Returns to the initial page
  const back = () => {
    navigate('/');
  };

  //Gets the info in the json file for the history
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
        <button onClick={back} className="btn">Volver</button>
      </div>
    </div>
  );
}

export default HistoryPage;

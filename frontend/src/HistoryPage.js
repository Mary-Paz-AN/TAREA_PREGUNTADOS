import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import InfoHandler from './InfoHandler';

function HistoryPage() {
  const [games, setGames] = useState([]);
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  //Gets the info in the json file for the history
  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        historyValidation(data);
      });
  }, []);

  //Returns to the initial page
  const back = () => {
    navigate('/');
  };

  //Validates if there are already games played
  const historyValidation = (data) => {
    if(data.length === 0) {
      setWarning(true);
    }
  };


  return (
    <div>
      <div id="centerBox">
        <div><h2 className="title">Historial</h2></div>
        <div id="box">
          {games.map((game) => (
            <div key={game.id}>
              <h1 className="subTitle">Partida {game.id}</h1>
              <p className="subTitleMedium"><span style={{color: "#1764c8"}}>Jugador:</span> {game.name}</p>
              <p className="subTitleMedium"><span style={{color: "#1764c8"}}>Preguntas Acertadas:</span> {game.won}</p>
              <p className="subTitleMedium"><span style={{color: "#1764c8"}}>Preguntas Falladas:</span> {game.lose}</p>
              <p className="subTitleMedium"><span style={{color: "#1764c8"}}>¿Ganó? </span> {game.state ? 'Si' : 'No'}</p>
            </div>
          ))}
        </div>
        <button onClick={back} className="btn">Volver</button>
        <InfoHandler
          message="Todavía no existen partidas."
          show={warning}
          close={() => setWarning(false)}
          type="ADVERTENCIA"
        />
      </div>
    </div>
  );
}

export default HistoryPage;

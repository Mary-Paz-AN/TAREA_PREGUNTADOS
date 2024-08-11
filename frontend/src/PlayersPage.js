import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import InfoHandler from './InfoHandler';

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();
  
  //Get the player info from the json file
  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
        playerValidation(data);
      });
  }, []);

  const game = (name) => {
    navigate('/game', { state: { name: name } });
  };

  //Returns to the main page
  const back = () => {
    navigate('/');
  };

  //Validates if previous players exist
  const playerValidation = (data) => {
    if(data.length === 0) {
      setWarning(true);
    }
  };

  return (
    <div>
      <div id="centerBox">
        <h1 className="title">Haga click en el nombre que desea para jugar:</h1>
        <div id="box" style={{backgroundColor: "#171d5b"}}>
          {players.map((player) => (
            <button key={player.id} onClick={() => game(player.name)} className="titleMedium">{player.name}</button>
          ))}
        </div>
        <button onClick={back} className="btn">Volver</button>
        <InfoHandler
          message="Todavía no existen jugadores."
          show={warning}
          close={() => setWarning(false)}
          type="ADVERTENCIA"
        />
      </div>
    </div>
  );
}

export default PlayersPage;

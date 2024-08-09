import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  
  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  const game = () => {
    console.log("Todo bien");
  };

  return (
    <div>
      <div id="centerBox">
        <h1 className="title">Haga click en el nombre que desea para jugar:</h1>
        <div id="box" style={{backgroundColor: "#171d5b"}}>
          {players.map((player) => (
            <Link to="/game" key={player.id} onClick={game} className="titleMedium">{player.name}</Link>
          ))}
        </div>
        <Link to="/" className="btn">Volver</Link>
      </div>
    </div>
  );
}

export default PlayersPage;

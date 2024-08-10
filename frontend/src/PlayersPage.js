import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  const game = (id) => {
    navigate('/game', { state: { id: id } });
  };

  return (
    <div>
      <div id="centerBox">
        <h1 className="title">Haga click en el nombre que desea para jugar:</h1>
        <div id="box" style={{backgroundColor: "#171d5b"}}>
          {players.map((player) => (
            <button key={player.id} onClick={() => game(player.id)} className="titleMedium">{player.name}</button>
          ))}
        </div>
        <Link to="/" className="btn">Volver</Link>
      </div>
    </div>
  );
}

/*Tengo pensadocmbiar el link para ver si asi logro pasarle el id a la otra pagina */

export default PlayersPage;

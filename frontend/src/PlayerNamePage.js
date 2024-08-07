//import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Styles.css";


function PlayerNamePage() {
    const navigate = useNavigate();

    const game = () => {
        navigate('/game');
    };
    //Falta implementación para añadir name al json
    
    return (
        <div>
            <div id="centerBox">
                <h1 className="title">Ingrese su name</h1>
                <input className="inpt"></input>
                <button onClick={game} className="btn">Aceptar</button>
            </div>
        </div>
    );
}

export default PlayerNamePage;

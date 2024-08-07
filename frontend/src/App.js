import "./Styles.css";
import { Link } from 'react-router-dom';

//This is the look of the main page. It´s like the game menu
function App() {
  return (
    <div>
      <div id="centerBox">
        <h1 className="title">Preguntados: ¡Ponte a prueba!</h1>
        <p className="text">Elija la opción que desee.</p>
        <Link to="/playerName" className="btn">Iniciar Juego</Link>
        <Link to="/players" className="btn">Jugadores</Link>
        <Link to="/history" className="btn">Historial</Link>
      </div>
    </div>
  );
}

export default App;

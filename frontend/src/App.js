import { Link } from 'react-router-dom';
import "./Styles.css";

//The main page
function App() {
  return (
    <div>
      <div id="centerBox">
        <h1 className="title">Preguntados: ¡Ponte a prueba!</h1>
        <p className="text">Elija la opción que desee.</p>
        <Link to="/playerName" className="btn">Iniciar Juego</Link>
        <Link to="/players" className="btn">Jugadores</Link>
        <Link to='/history' className="btn">Historial</Link>
      </div>
    </div>
  );
}

export default App;

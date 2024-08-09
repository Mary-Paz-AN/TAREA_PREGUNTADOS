import { useNavigate } from 'react-router-dom';

function GamePage() {
  const navigate = useNavigate();

  //Returns to the initial page
  const back = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Juego</h1>
      <p>¡Aquí se jugará el juego!</p>
      <button onClick={back} className="btn">Volver</button>
    </div>
  );
}

export default GamePage;

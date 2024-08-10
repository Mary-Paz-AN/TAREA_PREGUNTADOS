import { useNavigate, useLocation } from 'react-router-dom';

function GamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  //Returns to the initial page
  const back = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Juego</h1>
      <p>¡Aquí se jugará el juego! {id}</p>
      <button onClick={back} className="btn">Volver</button>
    </div>
  );
}

export default GamePage;

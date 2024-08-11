//import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function GamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  /*const [message, setMessage] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [warning, setWarning] = useState(false);*/

  const { name } = location.state || {};
  /*const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  let right = 0;
  let wrong = 0;
  let state = false;*/

  //Returns to the initial page
  const back = () => {
    navigate('/');
  };

  //Save the name on the json file
  /*const saveName = (e) => {
    e.preventDefault();
    
    fetch('/api/playerName', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    })
    .then((res) => {
      if(!res.ok) {
        return res.json.then((error) => {
            throw new Error(error.error);
        });
      }
      return res.json(); //Sera que tengo que quitar esto?
    })
    .catch((err) => {
      alert('Error al guardar los datos.', err.message);
      console.error(err.message);
    });
  };*/

  return (
    <div>
      <div id='centerBox'>
        <h1 className='title'>A ver que tanto sabes {name}</h1>
        <h id='pregunta'className='boxQuestion'>¿Cuál es el nombre completo del comopositor conocido como Beethoven?</h>
        <button id='r1' onClick={back} className="btnAnswer">Una interfaz que permite que diferentes programas se comuniquen entre sí</button>
        <button id='r2' onClick={back} className="btnAnswer">Volver</button>
        <button id='r3' onClick={back} className="btnAnswer">Volver</button>
        <button id='btnB' onClick={back} className="btn">Volver</button>
      </div>
    </div>
  );
}

export default GamePage;

import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import InfoHandler from './InfoHandler';

function GamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [infoBox, setInfoBox] = useState(false);

  // Questions and answers realated constants
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [a1, setA1] = useState('');
  const [a2, setA2] = useState('');
  const [a3, setA3] = useState('');
  const [end, setEnd] = useState(false);

  //Data constants
  const { name } = location.state || {};
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [state, setState] = useState(true);

 // Gets the questions in the JSON file
 useEffect(() => {
  fetch("/api/questions")
    .then((res) => res.json())
    .then((data) => setQuestions(data));
  }, []);

  //Get the answers for the question
  const getAnswers = useCallback((idQuestion) => {
    fetch('/api/answers', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: idQuestion }),
    })
    .then((res) => {
      if(!res.ok) {
        return res.json().then((error) => {
            throw new Error(error.error);
        });
      }
      return res.json();
    })
    .then((data) => {
      setAnswers(data);
    })
    .catch((err) => {
      alert('Error al conseguir los datos.', err.message);
      console.error(err.message);
    });
  }, []);

  //Verify if the player win or not
  const verifyWin = useCallback(() => {
    fetch('/api/win', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ right: right }),
    })
    .then(async (res) => {
      if(!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
      }
      return res.json();
    })
    .then((data) => {
      setState(data.state);
    })
    .catch((err) => {
      alert('Error al conseguir los datos.', err.message);
      console.error(err.message);
    });
  }, [right]);

  //Give a personalized message if the player win or lost
  const endGame = useCallback(() => {
    if(state) {
      setTitle('¡FIN DEL JUEGO!');
      setMessage(`Felicidades, se ve que si sabe. 🎉
    Obtuvo ${right} buenas y ${wrong} malas.
    Para salir presione una respuesta o el botón Volver`);
      setInfoBox(true);
    } else {
      setTitle('¡FIN DEL JUEGO!');
      setMessage(`Suerte la proxima. 😔
        Obtuvo ${right} buenas y ${wrong} malas.
        Para salir presione una respuesta o el botón Volver`);
      setInfoBox(true);
    }

    setEnd(true);
  }, [state, right, wrong]);

  //Save the fata of the game to the history
  const saveGame = useCallback(() => {
    fetch('/api/saveGame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, won: right, lose: wrong, state: state }),
    })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw new Error(error.error);
        });
      }
    })
    .catch((err) => {
      alert('Error al guardar los datos.', err.message);
      console.error(err.message);
    });
  }, [name, right, wrong, state]);

  // Handles the game logic
  const game = useCallback(() => {
    if (index < questions.length - 1) {
      setQuestion(questions[index].question);
      getAnswers(questions[index].id);
    } else {
      verifyWin();
      saveGame();
      endGame();
    }
  }, [index, questions, getAnswers, verifyWin, saveGame, endGame]);

  // Move to the next question
  const validatesAnswer = (numAnswer) => {
    if(end) {
      back();
    } else {
      fetch('/api/validateAnswer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: answers, id: answers[numAnswer].num }),
      })
      .then(async (res) => {
        if(!res.ok) {
          const error = await res.json();
          throw new Error(error.error);
        }
        return res.json();
      })
      .then((data) => {
        correctIncorrect(data);
      })
      .catch((err) => {
        alert('Error al conseguir los datos.', err.message);
        console.error(err.message);
      });
    }
  };

  //Send a personalized message if the answer y correct or not
  const correctIncorrect = (info) => {
    if(info.correct) {
      setTitle('¡Felicidades!');
      setMessage('Respondio correctamente.');
      setInfoBox(true);
      setRight(right + 1);
    } else {
      setTitle('Suerte la proxima');
      setMessage(`La respuesta correcta es: ${info.text}`);
      setInfoBox(true);
      setWrong(wrong + 1);
    }

    setIndex(index + 1);
  } 

  // Returns to the main page
  const back = () => {
    navigate('/');
  };

  //Starts the game
  useEffect(() => {
    if (questions.length > 0 && index < questions.length) {
      game();
    }
  }, [index, questions, game]);

  //Set the answers in the game
  useEffect(() => {
    if (answers.length > 0) {
      setA1(answers[0].answer);
      setA2(answers[1].answer);
      setA3(answers[2].answer);
    }
  }, [answers]);

  return (
    <div>
      <div id='centerBox'>
        <h1 className='title'>A ver que tanto sabe {name}</h1>
        <p className='boxQuestion'>{question}</p>
        <button onClick={() => validatesAnswer(0)} className="btnAnswer">{a1}</button>
        <button onClick={() => validatesAnswer(1)} className="btnAnswer">{a2}</button>
        <button onClick={() => validatesAnswer(2)} className="btnAnswer">{a3}</button>
        <button onClick={back} className="btn">Volver</button>
        <InfoHandler
          message={message}
          show={infoBox}
          close={() => setInfoBox(false)}
          type={title}
        />
      </div>
    </div>
  );
}

export default GamePage;

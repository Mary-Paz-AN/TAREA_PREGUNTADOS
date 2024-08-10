import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ErrorHandler from './ErrorHandler';
import "./Styles.css";


function PlayerNamePage() {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const numbers = /\d/;
    const navigate = useNavigate();

    //Validates if the values in the input 
    const inputValidation = () => {
        if(!name || name.length < 3 || numbers.test(name)) {
            setError(true);
            return false;
        } else {
            return true;
        }
    }

    //Save the name on the json file
    const saveName = (e) => {
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
            return res.json();
        })
        .then((data) => {
            setName('');
            navigate('/game', { state: { id: data.id } });
        })
        .catch((err) => {
            alert('Error al guardar los datos.', err.message);
            console.error(err.message);
        });
    };

    //Auxiliar function for more order
    const game = (e) => {
        let validation = inputValidation();
        if(validation) {
            saveName(e);
        }
    };

    //Returns to the initial page
    const back = () => {
        navigate('/');
    };
    
    
    return (
        <div>
            <div id="centerBox">
                <h1 className="title">Ingrese su nombre</h1>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} className="inpt"></input>
                <button onClick={game} className="btn">Aceptar</button>
                <button onClick={back} className="btn">Volver</button>
                <ErrorHandler
                    message="El nombre debe tener mínimo 3 carácteres alfabéticos."
                    show={error}
                    close={() => setError(false)}
                />
            </div>
        </div>
    );
}

export default PlayerNamePage;

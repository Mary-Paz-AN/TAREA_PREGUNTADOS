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
            .then(response => response.text())
            .then(data => {
                alert(data);
            })
                .catch(err => {
                    alert('Error al guardar los datos.');
                    console.error(err);
                });
    };

    //
    const game = (e) => {
        let validation = inputValidation();
        if(validation) {
            saveName(e);
            setName('');
            navigate('/game');
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

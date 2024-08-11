import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InfoHandler from './InfoHandler';


function PlayerNamePage() {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const numbers = /\d/;
    const navigate = useNavigate();

    //Validates the values in the input 
    const inputValidation = (e) => {
        if(!name || name.length < 3 || numbers.test(name)) {
            setError(true);
        } else {
            navigate('/game', { state: { name: name } });
        }
    }

    //Returns to the main page
    const back = () => {
        navigate('/');
    };
    
    
    return (
        <div>
            <div id="centerBox">
                <h1 className="title">Ingrese su nombre</h1>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} className="inpt"></input>
                <button onClick={inputValidation} className="btn">Aceptar</button>
                <button onClick={back} className="btn">Volver</button>
                <InfoHandler
                    message="El nombre debe tener mínimo 3 carácteres alfabéticos."
                    show={error}
                    close={() => setError(false)}
                    type = 'ERROR'
                />
            </div>
        </div>
    );
}

export default PlayerNamePage;

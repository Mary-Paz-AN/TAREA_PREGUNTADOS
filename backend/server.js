//Dependency for the proper functioning of the server
const express = require("express");
const fS = require('fs');

//Constants
const app = express();
const PORT = process.env.PORT || 3001;

//
app.listen(PORT, () => console.log(`The server started on  http://localhost:${PORT}`));
app.use(express.static("build"));
app.use( express.json());
app.use(express.urlencoded({ extended: true}));

//
//Route to get the players name
app.get('/api/players', (req, res) => {
    const playersData = require('./history.json');
    res.json(playersData);
});

//Get the history info
app.get('/api/history', (req, res) => {
    const playersData = require('./history.json');
    res.json(playersData);
});

//Get the questions for the game
app.get('/api/questions', (req, res) => {
    const questionsData = require('./questions.json');
    res.json(questionsData);
});

//Save the player name
app.post('/api/playerName', (req, res) => {
    console.log(req.body);
    const {name} = req.body;
    fS.readFile('history.json', 'utf-8', (error, data) => {
        if(error) {
            return resizeBy.status(500).send('Error al leer el archivo');
        }
    
        let dataJson = [];
        if(data) {
            dataJson = JSON.parse(data);
        }

        const idPlayer = (dataJson.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1);
    
        dataJson.push({id: idPlayer, name, won: 0, lose: 0, state: false});
    
        fS.writeFile('history.json', JSON.stringify(dataJson, null, 2), (err) => {
            if(err) {
                return res.status(500).send('Error al guardar el archivo.');
            }
    
            res.status(200).send('Datos guardados exitosamente.');
        });
    });
});

  

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`The server started on  http://localhost:${PORT}`));

app.use(express.static("build"));

// Ruta para servir datos de jugadores
app.get('/api/players', (req, res) => {
    const playersData = require('./history.json');
    res.json(playersData);
});

app.get('/api/history', (req, res) => {
    const playersData = require('./history.json');
    res.json(playersData);
});

// Ruta para servir datos de preguntas
app.get('/api/questions', (req, res) => {
    const questionsData = require('./questions.json');
    res.json(questionsData);
});

app.post('/api/playerName', (req, res) => {
    console.log("Algo tengo hacer.");
});
  

//Dependency for the proper functioning of the server
const express = require("express");
const { verifyFileExistence, chooseQuestions, chooseAnswers, validateAnswer, win, saveGame } = require('./utils');

//Constants
const app = express();
const PORT = process.env.PORT || 3001;

//
app.listen(PORT, () => console.log(`The server started on  http://localhost:${PORT}`));
app.use(express.static("build"));
app.use( express.json());
app.use(express.urlencoded({ extended: true}));

//Gets and Posts
//Route to get the players name
app.get('/api/players', (req, res) => {
    verifyFileExistence('history.json');
    const playersData = require('./history.json');
    res.json(playersData);
});

//Get the history info
app.get('/api/history', (req, res) => {
    verifyFileExistence('history.json');
    const historyData = require('./history.json');
    res.json(historyData);
});

//Get the questions from the json file
app.get('/api/questions', (req, res) => {
    const {id} = req.body;
    chooseQuestions(res);
}); 

//Gets the anwers in a random position
app.post('/api/answers', (req, res) => {
    const {id} = req.body;
    chooseAnswers(id, res);
}); 

//Ask if the awers is correct or incorrect
app.post('/api/validateAnswer', (req, res) => {
    const {answers, id} = req.body;
    validateAnswer(answers, id, res);
}); 

//Ask if the player win or lose
app.post('/api/win', (req, res) => {
    const {right} = req.body;
    win(right, res);
});

//Save the player info of the game
app.post('/api/saveGame', (req, res) => {
    const {name, won, lose, state} = req.body;
    verifyFileExistence('history.json');
    saveGame(name,  won, lose, state, res);
});

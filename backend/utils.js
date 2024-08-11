/* Here are all the functions for the game to work properly. */
const fS = require('fs');

//Verify if the file exists
function verifyFileExistence(path) {
    //If the file doesn´t exist, it creates a new file with a basic structure
    if (!fS.existsSync(path)) {
        fS.writeFileSync(path, JSON.stringify([], null, 2));
    }
}

//Choose 10/15 questioons for the game
function chooseQuestions(res) {
    fS.readFile('questions.json', 'utf-8', (err, info) => {
        if(err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }
    
        let jsonQuestions = JSON.parse(info);
        let questions = [];
    
        while (questions.length < 10 && jsonQuestions.length > 0) {
            const selectedIndex = Math.floor(Math.random() * jsonQuestions.length);
            const selectedQuestion = jsonQuestions.splice(selectedIndex, 1)[0]; 

            questions.push(selectedQuestion);
        }

        res.status(200).json(questions);

    });
}

//Returns a list of the anwers in different positions
function chooseAnswers(questionId, res) {
    fS.readFile('questions.json', 'utf-8', (err, info) => {
        if(err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }
    
        let jsonQuestions = JSON.parse(info);
        let question = jsonQuestions.find(q => q.id === questionId);
        let jsonAnswers = question.answers;
        let answers = [];
        
        while (answers.length < 3 && jsonAnswers.length > 0) {
            const selectedIndex = Math.floor(Math.random() * jsonAnswers.length);
            const selectedAnswer = jsonAnswers.splice(selectedIndex, 1)[0]; 

            answers.push(selectedAnswer);
        }

        res.status(200).json(answers);

    });
}

//Checks if the anwer igivwn by the user is correct
function validateAnswer(answers, answerId, res) {
    let state = false;

    if(answerId === 1) {
        state = true;
    }

    let correctAnswer = (answers.find(a => a.correct === true)).answer;
    res.status(200).json({ correct: state, text: correctAnswer });
}

//Validates if the player win
function win(right, res) {
    if(right >= 6) {
        res.status(200).json({ state: true });
    } else {
        res.status(200).json({ state: false });
    }
}

//Saves the information of the game to he history.json
function saveGame(name, won, lose, state, res) {
    fS.readFile('history.json', 'utf-8', (err, info) => {
        if(err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }
    
        let dataJson = [];
        if(info) {
            dataJson = JSON.parse(info);
        }

        const idPlayer = (dataJson.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1);
        dataJson.push({id: idPlayer, name, won, lose, state});
    
        fS.writeFile('history.json', JSON.stringify(dataJson, null, 2), (err) => {
            if(err) {
                return res.status(500).json({ error: 'Error al guardar el archivo.' });
            }
    
            res.status(200).json({ fin: "Todo salio bien." });
        });
    });
}

module.exports = { verifyFileExistence, chooseQuestions, chooseAnswers, validateAnswer, win, saveGame };
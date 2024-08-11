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
    
        for(let i = 0; i < 10; i++) {
            const selectedQuestion = Math.floor(Math.random() * jsonQuestions.length);

            questions-push(jsonQuestions[selectedQuestion]);
            jsonQuestions.slice(selectedQuestion, 1);
        };

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
        let jsonAnswers = question.nswers;
        let answers = [];
    
        for(let i = 0; i < 3; i++) {
            const selectedAnswer = Math.floor(Math.random() * jsonAnswers.length);

            answers-push(jsonAnswers[selectedAnswer]);
            jsonAnswers.slice(selectedAnswer, 1);
        };

        res.status(200).json(answers);

    });
}

//Checks if the anwer igivwn by the user is correct
function validateAnswer(answers, answerId, res) {
    let state = false;

    if(answerId === 1) {
        state = true;
    }

    let correctAnswer = (answers.find(a => a.correct === true)).text;
    res.status(200).json({ coorect: state, text: correctAnswer });
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
    
            res.status(200).json({ id: idPlayer });
        });
    });
}

module.exports = { verifyFileExistence, chooseQuestions, chooseAnswers, validateAnswer, win, saveGame };
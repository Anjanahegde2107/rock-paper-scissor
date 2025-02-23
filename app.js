const choices = document.querySelectorAll('.choice');
const userScoreSpan = document.getElementById('user-score');
const computerScoreSpan = document.getElementById('computer-score');
const resultDiv = document.getElementById('result');

let userScore = 0;
let computerScore = 0;

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const userChoice = choice.id;
        const computerChoice = getComputerChoice();
        const winner = getWinner(userChoice, computerChoice);
        showResult(userChoice, computerChoice, winner);
    });
});

function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getWinner(user, computer) {
    if (user === computer) return 'draw';
    if ((user === 'r' && computer === 's') ||
        (user === 'p' && computer === 'r') ||
        (user === 's' && computer === 'p')) {
        return 'user';
    }
    return 'computer';
}

function showResult(user, computer, winner) {
    const choices = {
        'r': 'Rock',
        'p': 'Paper',
        's': 'Scissors'
    };

    if (winner === 'user') {
        userScore++;
        resultDiv.innerHTML = `${choices[user]} beats ${choices[computer]}! You win! 🎉`;
    } else if (winner === 'computer') {
        computerScore++;
        resultDiv.innerHTML = `${choices[computer]} beats ${choices[user]}! You lose! 😢`;
    } else {
        resultDiv.innerHTML = `${choices[user]} vs ${choices[computer]}! It's a draw! 🤝`;
    }
    
    updateScores();
}

function updateScores() {
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
}
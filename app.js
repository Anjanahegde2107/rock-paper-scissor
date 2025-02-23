const choices = document.querySelectorAll('.choice');
const userScoreSpan = document.getElementById('user-score');
const computerScoreSpan = document.getElementById('computer-score');
const resultDiv = document.getElementById('result');
const actionMessage = document.getElementById('action-message');

let userScore = 0;
let computerScore = 0;

// Load scores from localStorage
if(localStorage.getItem('scores')) {
    const scores = JSON.parse(localStorage.getItem('scores'));
    userScore = scores.user;
    computerScore = scores.computer;
    updateScores();
}

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
        'r': 'Rock 🪨',
        'p': 'Paper 📄',
        's': 'Scissors ✂️'
    };

    resultDiv.className = '';
    resultDiv.classList.add(winner === 'user' ? 'win' : 
                          winner === 'computer' ? 'lose' : 'draw');
    
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
    saveScores();
}

function updateScores() {
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
}

function saveScores() {
    localStorage.setItem('scores', JSON.stringify({
        user: userScore,
        computer: computerScore
    }));
} 
const buttons = document.querySelectorAll('.button');
const patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8], 
];
const resetButton = document.querySelector('.reset-btn');
const startButton = document.querySelector('.start-btn');
const restartButton = document.querySelector('.restart-btn');
let title = document.querySelector('.msg');
let startOverlay = document.querySelector('.start-overlay');
let endOverlay = document.querySelector('.end-overlay');
let playerX = document.querySelector('#playerX');
let playerO = document.querySelector('#playerO');
let turnOfO = false;

const togglePlayer = () => {
    if(turnOfO) {
        playerO.classList.add('glow');
        playerX.classList.remove('glow');
    } else {
        playerX.classList.add('glow');
        playerO.classList.remove('glow');
    }
};

const disableButtons = () => {
    buttons.forEach((button) => {
        button.disabled = true;
    })
};

const enableButtons = () => {
    buttons.forEach((button) => {
        button.disabled = false;
        button.textContent = "";
    });
    turnOfO = false;
    togglePlayer();
};

const showWinner = (winner) => {
    title.textContent = `Player - '${winner}' Won`;
    endOverlay.classList.add('show');
};

const checkWinner = () => {
    for(var pattern of patterns) {
        let pos1Val = buttons[pattern[0]].innerHTML;
        let pos2Val = buttons[pattern[1]].innerHTML;
        let pos3Val = buttons[pattern[2]].innerHTML;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "")
        {
            if(pos1Val === pos2Val && pos2Val === pos3Val)
            {
                showWinner(pos1Val);
                disableButtons();
            }
        }
    }
};

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(turnOfO) {
            button.textContent = 'O';
            turnOfO = false;
        } else {
            button.textContent = 'X';
            turnOfO = true;
        }
        togglePlayer();
        button.disabled = true;
        checkWinner();
    });
});

resetButton.addEventListener('click', () => {
    enableButtons();
});

startButton.addEventListener('click', () => {
    startOverlay.classList.add('hide');
    togglePlayer();
});

restartButton.addEventListener('click', () => {
    enableButtons();
    endOverlay.classList.remove('show');
    togglePlayer();
});


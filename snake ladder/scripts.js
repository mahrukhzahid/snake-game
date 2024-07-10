document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 100;
    const snakes = { 99: 54, 70: 55, 52: 42, 25: 2, 95: 72 };
    const ladders = { 6: 25, 11: 40, 60: 85, 46: 90, 17: 69 };
    let playerPositions = [0, 0];
    let currentPlayer = 0;

    // Create game board
    const gameBoard = document.getElementById('gameBoard');
    for (let i = 1; i <= boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `cell-${i}`;
        cell.innerText = i;
        gameBoard.appendChild(cell);
    }

    // Create player tokens
    const player1 = document.createElement('div');
    player1.id = 'player1';
    player1.classList.add('player');
    document.getElementById('cell-1').appendChild(player1);

    const player2 = document.createElement('div');
    player2.id = 'player2';
    player2.classList.add('player');
    document.getElementById('cell-1').appendChild(player2);

    // Dice roll functionality
    const rollDiceButton = document.getElementById('rollDice');
    const diceResult = document.getElementById('diceResult');
    const playerTurn = document.getElementById('playerTurn');

    rollDiceButton.addEventListener('click', () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        diceResult.innerText = `Dice: ${roll}`;
        movePlayer(roll);
    });

    function movePlayer(roll) {
        let playerPosition = playerPositions[currentPlayer];
        playerPosition += roll;

        if (playerPosition > boardSize) {
            playerPosition = boardSize;
        }

        // Check for snakes or ladders
        if (snakes[playerPosition]) {
            playerPosition = snakes[playerPosition];
        } else if (ladders[playerPosition]) {
            playerPosition = ladders[playerPosition];
        }

        playerPositions[currentPlayer] = playerPosition;

        // Update player position on the board
        const playerToken = document.getElementById(`player${currentPlayer + 1}`);
        const cell = document.getElementById(`cell-${playerPosition}`);
        cell.appendChild(playerToken);

        // Check for win condition
        if (playerPosition === boardSize) {
            alert(`Player ${currentPlayer + 1} wins!`);
            resetGame();
        } else {
            // Switch turn to the next player
            currentPlayer = (currentPlayer + 1) % 2;
            playerTurn.innerText = `Player ${currentPlayer + 1}'s Turn`;
        }
    }

    function resetGame() {
        playerPositions = [0, 0];
        currentPlayer = 0;
        document.getElementById('cell-1').appendChild(player1);
        document.getElementById('cell-1').appendChild(player2);
        playerTurn.innerText = `Player 1's Turn`;
    }
});

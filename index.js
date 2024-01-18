document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    };

    const checkDraw = () => {
        return !gameBoard.includes('');
    };

    const handleCellClick = (index) => {
        if (!gameBoard[index] && gameActive) {
            gameBoard[index] = currentPlayer;
            cells[index].textContent = currentPlayer;

            if (checkWinner()) {
                message.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
            } else if (checkDraw()) {
                message.textContent = 'It\'s a draw!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    };

    const handleResetClick = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;

        cells.forEach((cell) => {
            cell.textContent = '';
        });

        message.textContent = 'Player X\'s turn';
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    resetButton.addEventListener('click', handleResetClick);
});
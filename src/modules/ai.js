export class AI {

    constructor(game, board, aiPlayer, opponent) {
        this.game = game;
        this.board = board;
        this.aiPlayer = aiPlayer;
        this.opponent = opponent;
    }

    playAI() {
        return this.game.draw(this.getBestMove(this.board.cloneBoard()))
    }

    /**
     * Get the best move
     * @param {*} board 
     */
    getBestMove(board) {
        let bestScore = -100
        let currentScore;
        let bestMove;

        const moves = board.getAvailableMoves();
        const corners = [[0, 0], [0, 2], [2, 0], [2, 2]]
        const turn = this.game.getTurnCount()

        if (turn === 0) {
            return [1,1];
        } else if (turn === 1 && !board.isPlayed([1, 1])) {
            return [1,1];
        } else if (turn === 1) {
            return corners.find(corner => (!board.isPlayed(corner)))
        }

        moves.forEach(move => {
            let newBoard = board.cloneBoard();
            newBoard.playMemory(move, this.aiPlayer.color);
            currentScore = this.minimax(newBoard, false)
            if (currentScore > bestScore) {
                bestScore = currentScore
                bestMove = move
            }
        })

        return bestMove
    }

    /**
     * Minimax algorithm
     * @param {*} board 
     * @param {*} maximizing 
     * @param {*} depth 
     */
    minimax(board, maximizing = true, depth = 0) {
        const winner = this.game.getWinner(board, false);

        if (!board.isEmpty()) {
            if (!winner) {
                return 0
            } else {
                if (this.game.getWinnerPlayer(false).getColor() === 'red') {
                    return 100 - depth;
                } else {
                    return -100 + depth;
                }
            }
        }

        if (winner) {
            if (this.game.getWinnerPlayer(false).getColor() === 'red') {
                return 100 - depth;
            } else {
                return -100 + depth;
            }
        }


        let currentScore = 0
        const moves = board.getAvailableMoves();

        // Maximazing
        if (maximizing) {
            let bestScore = -100
            moves.forEach(move => {
                let newBoard = board.cloneBoard();
                newBoard.playMemory(move, this.aiPlayer.color)
                currentScore = this.minimax(newBoard, false, depth++)
                if (currentScore > bestScore) {
                    bestScore = currentScore
                }
            });
            return bestScore
        }

        // Minimazing
        if (!maximizing) {
            let bestScore = 100
            moves.forEach(move => {
                let newBoard = board.cloneBoard();
                newBoard.playMemory(move, this.opponent)
                currentScore = this.minimax(newBoard, true, depth++)
                if (currentScore < bestScore) {
                    bestScore = currentScore
                }
            })
            return bestScore
        }
    }
}
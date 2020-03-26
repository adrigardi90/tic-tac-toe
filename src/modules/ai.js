export class AI {

    constructor(game, board, aiPlayer, opponent) {
        this.game = game;
        this.board = board;
        this.aiPlayer = aiPlayer;
        this.opponent = opponent;
    }

    playAI(pruning) {
        return this.game.draw(this.getBestMove(this.board.cloneBoard(), pruning))
    }

    /**
     * Get the best move. AI player always look for maximizing the score 
     * The desired outcome for AI player will be 1
     * @param {*} board 
     */
    getBestMove(board, pruning) {
        const init = Date.now()
        let bestScore = -100 // Maximizing
        let currentScore;
        let bestMove;

        // Just for minimax pruning
        let alpha = -100; //maximazing
        let beta = 100; //minimizing

        const moves = board.getAvailableMoves();
        const corners = [[0, 0], [0, 2], [2, 0], [2, 2]]
        const turn = this.game.getTurnCount()

        if (turn === 0)
            return [1, 1];

        if (turn === 1 && !board.isPlayed([1, 1]))
            return [1, 1];

        if (turn === 1)
            return corners.find(corner => (!board.isPlayed(corner)))

        moves.forEach(move => {
            let newBoard = board.cloneBoard();
            newBoard.playMemory(move, this.aiPlayer.color);
            currentScore = pruning ? this.minimaxPruning(newBoard, false, 0, alpha, beta) : this.minimax(newBoard, false, 0)

            if (pruning) alpha = currentScore

            if (currentScore > bestScore) {
                bestScore = currentScore
                bestMove = move
            }
        })

        const end = Date.now()
        const diff = end - init
        console.log(diff)
        return bestMove
    }

    /**
     * Minimax algorithm
     * @param {*} board 
     * @param {*} maximizing 
     * @param {*} depth 
     */
    minimax(board, maximizing = true, depth) {
        const winner = this.game.getWinner(board, false);

        const score = this.checkScore(board, winner, depth)
        if (!isNaN(score)) return score

        let currentScore = 0
        const moves = board.getAvailableMoves();

        // Maximazing
        if (maximizing) {
            let bestScore = -100
            moves.forEach(move => {
                let newBoard = board.cloneBoard();
                newBoard.playMemory(move, this.aiPlayer.color)
                currentScore = this.minimax(newBoard, false, ++depth)
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
                currentScore = this.minimax(newBoard, true, ++depth)
                if (currentScore < bestScore) {
                    bestScore = currentScore
                }
            })
            return bestScore
        }
    }

    /**
     * Check the node score
     * @param {*} board 
     * @param {*} winner 
     * @param {*} depth 
     */
    checkScore(board, winner, depth) {
        if (!board.isEmpty()) {
            if (!winner) return 0
            return this.getWinnerScore(depth)
        }

        if (winner) {
            return this.getWinnerScore(depth)
        }
    }

    /**
     * Get winner socreo
     */
    getWinnerScore(depth) {
        if (this.game.getWinnerPlayer(false).getColor() === 'red')
            return 100 - depth;

        return -100 + depth;
    }

    minimaxPruning(board, maximizing, depth, alpha, beta) {
        const winner = this.game.getWinner(board, false);

        const score = this.checkScore(board, winner, depth)
        if (!isNaN(score)) return score

        let currentScore = 0
        let localalpha = alpha
        let localbeta = beta
        const moves = board.getAvailableMoves();

        // Maximazing
        if (maximizing) {
            let bestScore = -100

            for (let index = 0; index < moves.length; index++) {
                const newBoard = board.cloneBoard();
                newBoard.playMemory(moves[index], this.aiPlayer.color)
                currentScore = this.minimaxPruning(newBoard, false, ++depth, localalpha, localbeta)

                if (currentScore > bestScore) {
                    bestScore = currentScore
                    localalpha = currentScore
                }

                if (currentScore > localbeta) {
                    break
                }
            }
            return bestScore
        }

        // Minimazing
        if (!maximizing) {
            let bestScore = 100

            for (let index = 0; index < moves.length; index++) {
                const newBoard = board.cloneBoard();
                newBoard.playMemory(moves[index], this.opponent)
                currentScore = this.minimaxPruning(newBoard, true, ++depth, localalpha, localbeta)

                if (currentScore < bestScore) {
                    bestScore = currentScore
                    localbeta = currentScore
                }

                if (currentScore < localalpha) {
                    break
                }
            }
            return bestScore
        }
    }
}
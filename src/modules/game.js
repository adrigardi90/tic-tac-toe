
export class Game {

	constructor(player1, player2, board) {
		this.players = [...arguments];
		this.turnColor = player1.getColor();
		this.turnName = player1.getName();
		this.board = board;
		this.colorWinner = '';
		this.colorMemoryWinner = '';
		this.turnCount = 0;
	}

	getTurnColor() {
		return this.turnColor;
	}

	getTurnName() {
		return this.turnName;
	}

	getTurnCount() {
		return this.turnCount;
	}

	/*
	 * Change the game's turn
	 */
	changeTurn() {
		this.turnColor === this.players[0].getColor() ? this.turnColor = this.players[1].getColor() : this.turnColor = this.players[0].getColor();
		this.turnName === this.players[0].getName() ? this.turnName = this.players[1].getName() : this.turnName = this.players[0].getName();
		this.turnCount++;
	}

	/**
	 * Play the tab
	 * @param {*} position 
	 */
	draw(position) {
		if (!this.board.isPlayed(position)) {
			return this.board.play(position, this.turnColor);
		}
		return false;
	}

	/*
	 * Check out if there is space to play
	 */
	canPlay() {
		return this.board.isEmpty();
	}

	/**
	 * Check out if there is a winner
	 * @param {*} board 
	 * @param {*} real 
	 */
	getWinner(board, real = true) {
		return board.hasWinner((winner) => {
			real ? this.colorWinner = winner : this.colorMemoryWinner = winner;
			return true;
		});
	}

	/**
	 * Get the winner
	 * @param {*} real 
	 */
	getWinnerPlayer(real = true) {
		return this.players.find((player) => {
			const color = real ? this.colorWinner : this.colorMemoryWinner
			return player.color === color
		})
	}

	/**
	 * Shows up an alert
	 * @param {*} msg 
	 * @param {*} timeout 
	 */
	printMessage(msg, timeout, reset){
		setTimeout(() => {
			alert(msg);
			reset()
		}, timeout);
	}


}
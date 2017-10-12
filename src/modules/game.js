export class Game{

	constructor(player1, player2, board){
		this.players = [...arguments];
		this.turnColor = player1.getColor();
		this.turnName = player1.getName();
		this.board = board;
		this.colorWinner = '';
	}

	getTurnColor(){
		return this.turnColor;
	}

	getTurnName(){
		return this.turnName;
	}

	/*
	 * Change the game's turn
	 */
	changeTurn(){
		this.turnColor === this.players[0].getColor() ? this.turnColor=this.players[1].getColor(): this.turnColor=this.players[0].getColor();
		this.turnName === this.players[0].getName() ? this.turnName=this.players[1].getName(): this.turnName=this.players[0].getName();
	}

	/*
	 * Play the tab
	 */
	draw(position){
		const pos = position.split("_");

		if(!this.board.isPlayed(pos))
			return this.board.play(pos, this.turnColor);

		return false;
	}

	/*
	 * Check if the is space to play
	 */
	canPlay(){
		return this.board.isEmpty();
	}

	/*
	 * Check if there is some winner
	 */
	getWinner(){
		return this.board.hasWinner((winner) => { 
			this.colorWinner = winner;
		});
	}

	/*
	 * Get the winner player
	 */
	getWinnerPlayer(winner = ''){
 		this.players.forEach((player) => {
 		 	if(player.color === this.colorWinner)
 		 		winner = player
 		})

		return winner;
	}


}
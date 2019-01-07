import { Game } from './modules/game';
import { Board } from './modules/board';
import { Player } from './modules/player';
import { AI } from './modules/ai';
import './scss/styles.scss';

function main(){

	const turn = document.getElementById("turn");
	const config = document.getElementById("config");
	const table = board.getBoard();
	const title = "Turno de ";

	config.addEventListener('change', ({ target: { value } }) => {
		config.disabled = true;
		process(value !== 'multiplayer')
	})

	const process = (minimax) => {
		turn.innerHTML = title + game.getTurnName();

		table.forEach((row, i) => {
			row.forEach((col, j) => {

				document.getElementById(`box${i}_${j}`).onclick = (e) => {
					config.disabled = true;

					const target = e.target || e.srcElement;
					const position = target.id.substr(target.id.length - 3, 3).split('_');

					turn.innerHTML = title + game.getTurnName();

					if (game.canPlay()) {

						if (game.draw(position)) {
							game.changeTurn();
							turn.innerHTML = title + game.getTurnName();
						}

						if (game.getWinner(board)) {
							game.printMessage(`Ha ganado ${game.getWinnerPlayer().getName()}`, 150, reset)
						}

						if (!game.canPlay() && !game.getWinner(board)) {
							game.printMessage('Empate', 150, reset)
						}

						if (minimax) {
							if (game.canPlay() && game.getTurnColor() === 'red' && aiPlayer.playAI()) {
								game.changeTurn();
								turn.innerHTML = title + game.getTurnName();
							}

							if (game.getWinner(board)) {
								game.printMessage(`Ha ganado ${game.getWinnerPlayer().getName()}`, 150, reset)
							}
						}
					}
				}

			});
		});
	}

};

//Reset the board and new game
function reset(){
	board.reset();
	game = new Game(adrian, player2, board);
	aiPlayer = new AI(game, board, player2, adrian.getColor());
	config.disabled = false;
}

//Players
const adrian = new Player("Adrian", "green", "X");
const player2 = new Player("Player 2", "red", "O");

//Board
const board = new Board();

//Game
let game = new Game(adrian, player2, board);

// Initialize Player2 as AI player
let aiPlayer = new AI(game, board, player2, adrian.getColor())

//Main
main();


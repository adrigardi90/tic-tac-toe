import { Game } from './modules/game';
import { Board } from './modules/board';
import { Player } from './modules/player';
import { AI } from './modules/ai';
import './scss/styles.scss';

function main(){

	const table = board.getBoard();

	config.addEventListener('change', ({ target: { value } }) => {
		config.disabled = true;
		process(value === 'minimax', value === 'minimax-pruning')
	})

	const process = (minimax, minimaxPruning) => {
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
							game.printMessage(`Winner: ${game.getWinnerPlayer().getName()}`, 150, reset)
						}

						if (!game.canPlay() && !game.getWinner(board)) {
							game.printMessage('Draw', 150, reset)
						}

						if (minimax || minimaxPruning) {
							if (game.canPlay() && game.getTurnColor() === 'red' && aiPlayer.playAI(minimaxPruning)) {
								game.changeTurn();
								turn.innerHTML = title + game.getTurnName();
							}

							if (game.getWinner(board)) {
								game.printMessage(`Winner: ${game.getWinnerPlayer().getName()}`, 150, reset)
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
	turn.innerHTML = title + adrian.getName();
}

// Config
const turn = document.getElementById("turn");
const config = document.getElementById("config");
const title = "Next turn: ";

//Players
const adrian = new Player("Adrian", "green");
const player2 = new Player("Player 2", "red");

//Board
const board = new Board();

//Game
let game = new Game(adrian, player2, board);

// Initialize Player2 as AI player
let aiPlayer = new AI(game, board, player2, adrian.getColor())

//Main
main();


import { Game } from './modules/game';
import { Board } from './modules/board';
import { Player } from './modules/player';
import {AI} from './modules/ai';
import './scss/styles.scss';


const main = () => {

	const turn = document.getElementById("turn");
	const table = board.getBoard();
	const title = "Turno de ";

	turn.innerHTML = title + game.getTurnName();

	table.forEach((row, i) => {
		row.forEach((col, j) => {

			document.getElementById(`box${i}_${j}`).onclick = (e) => {

				const target = e.target || e.srcElement;
				const position = target.id.substr(target.id.length-3, 3).split('_');

				turn.innerHTML = title + game.getTurnName();

				if(game.canPlay()){

					if(game.draw(position)){
						game.changeTurn();
						turn.innerHTML = title + game.getTurnName();
					}

					if(game.getWinner(board)){
						setTimeout(()=>{
							alert(`Ha ganado ${game.getWinnerPlayer().getName()}`);
							reset();
						},150);
					}

					if(!game.canPlay() && !game.getWinner(board)){
						setTimeout(()=>{
							alert("Empate");
							reset();
						},150);
					}

					if(game.canPlay() && game.getTurnColor() === 'red' && aiPlayer.playAI()){
						game.changeTurn();
						turn.innerHTML = title + game.getTurnName();
					}

					if(game.getWinner(board)){
						setTimeout(()=>{
							alert(`Ha ganado ${game.getWinnerPlayer().getName()}`);
							reset();
						},150);
					}

				}
				
			}

		}); 
	});
};

//Reset the board and new game
const reset = () => {

	board.reset();
	game = new Game(adrian, juanjo, board);
	aiPlayer = new AI(game, board, juanjo, adrian.getColor());
}

//Players
const adrian = new Player("Adrian", "green", "X");
const juanjo = new Player("Jose", "red", "O");

//Board
const board = new Board();

//Game
let game = new Game(adrian, juanjo, board);

// Initialize Juanjo as AI player
let aiPlayer = new AI(game, board, juanjo, adrian.getColor())

//Main
main();


import { Game } from './modules/game';
import { Board } from './modules/board';
import { Player } from './modules/player';
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
				const position = target.id.substr(target.id.length-3, 3);

				turn.innerHTML = title + game.getTurnName();

				if(game.canPlay()){

					if(game.draw(position)){
						game.changeTurn();
						turn.innerHTML = title + game.getTurnName();
					}

					if(game.getWinner()){
						setTimeout(()=>{
							alert(`Ha ganado ${game.getWinnerPlayer().getName()}`);
							reset();
						},150);
					}

					if(!game.canPlay() && !game.getWinner()){
						setTimeout(()=>{
							alert("Empate");
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

}

//Players
const adrian = new Player("Adrian", "green");
const juanjo = new Player("Jose", "red");

//Board
let board = new Board();

//Game
let game = new Game(adrian, juanjo, board);

//Main
main();


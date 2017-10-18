export class Board {

	constructor(){
		this.table = [[null, null, null],
					  [null, null, null],
					  [null, null, null]];
	}

	/*
	 * Play the tab in the board and change the styles
	 */
	play(position, value, pos=`${position[0]}_${position[1]}`){

		const tab = document.getElementById(pos).style;

		this.table[position[0]][position[1]] = value;
		tab.backgroundColor=value;
		tab.borderRadius='50%';

		return true; 
	}

	/*
	 * Reset the board 
	 */
	reset(){
		this.table = [[null, null, null],
					  [null, null, null],
					  [null, null, null]];

		this.table.forEach((row, i) => {
			row.forEach((col, j) => {

				const tab = document.getElementById(`${i}_${j}`).style; 
				tab.backgroundColor="#eef1ed";
				tab.borderRadius='0%';
			}); 
		});

	}

	print(){
		console.log(this.table)
	}

	/*
	 * Check if there is any space to play
	 */
	isEmpty(){
		return this.table.some(row => {
			return row.some( pos => {
				return pos === null;
			})
		});	
	}

	getBoard(){
		return this.table;
	}

	/*
	 * Get if a position is already played
	 */
	isPlayed(position){
		return !(this.table[position[0]][position[1]] === null);
	}

	/*
	 * Algorithm
	 */
	hasWinner(winner){

		return this.table.some((row, i) => {
			return row.some((col, j) => {

				let element = this.table[i][j];
				
				if(element != null){
					
					//ToDo: rewrite algorithm

					//Row winner
					if(row.every((elem)=> elem === element)) return winner(element);

					//Column winner
					if(element === this.table[0][j] && element === this.table[1][j] && element === this.table[2][j]) return winner(element);
					
					if(i === 0 && j===0)
						if(element === this.table[2][2] && element === this.table[1][1]) return winner(element);
					
					if(i === 0 && j===2)
						if(element === this.table[1][1] && element === this.table[2][0]) return winner(element);
 
					if(i === 1 && j===1)
						if(element === this.table[0][0] && element === this.table[2][2]) return winner(element);
 
					if(i === 2 && j===0)
						if(element === this.table[1][1] && element === this.table[0][2]) return winner(element);
	 
					if(i === 2 && j===2)
						if(element === this.table[1][1] && element === this.table[0][0]) return winner(element);					

				}
			});
		});

	}

}
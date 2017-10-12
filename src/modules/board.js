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
				
				if(this.table[i][j] != null){
					
					//ToDo: rewrite algorithm

					if(this.table[i][j] === row[0] && this.table[i][j] === row[1] && this.table[i][j] === row[2] ){
						winner(this.table[i][j]) 
						return true;
					} 

					if(this.table[i][j] === this.table[0][j]  && this.table[i][j] === this.table[1][j]  && this.table[i][j] === this.table[2][j]  ){
						winner(this.table[i][j])
						return true;
					} 

					if(i === 0 && j===0){
						if(this.table[i][j] === this.table[1][1]  && this.table[i][j] === this.table[2][2]){
							winner(this.table[i][j])
							return true;
						}	 
					}

					if(i === 0 && j===2){
						if(this.table[i][j] === this.table[1][1]  && this.table[i][j] === this.table[2][0]){
							winner(this.table[i][j])
							return true;
						}	 
					}

					if(i === 1 && j===1){
						if(this.table[i][j] === this.table[0][0]  && this.table[i][j] === this.table[2][2]){
							winner(this.table[i][j])
							return true;
						}	 
					}

					if(i === 2 && j===0){
						if(this.table[i][j] === this.table[1][1]  && this.table[i][j] === this.table[0][2]){
							winner(this.table[i][j])
							return true;
						}	 
					}

					if(i === 2 && j===2){
						if(this.table[i][j] === this.table[1][1]  && this.table[i][j] === this.table[0][0]){
							winner(this.table[i][j])
							return true;
						}	 
					}

				}
			});
		});

	}

}
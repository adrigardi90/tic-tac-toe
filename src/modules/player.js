export class Player{

	constructor(name, color){
		this.name = name;
		this.color = color;
	}

	getColor(){
		return this.color;
	}

	getName(){
		return this.name;
	}
}
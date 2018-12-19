
export class Player {

	constructor(name, color, seed) {
		this.name = name;
		this.color = color;
		this.seed = seed;
	}

	getColor() {
		return this.color;
	}

	getName() {
		return this.name;
	}
	
}
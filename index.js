class Observerable {
	#observers;

	constructor() {
		this.#observers = [];
	}

	subscribe(obs) {
		if (this.#observers.includes(obs)) return;
		this.#observers.push(obs);
	}

	describe(obs) {
		const obsIndex = this.#observers.indexOf(obs);
		if (obsIndex === -1) return;
		this.#observers.splice(obsIndex, 1);
	}

	notify() {
		for (const obs of this.#observers) {
			obs.update(this.state);
		}
	}
}

class Observer {
	update(products) {
		console.log(`New products!!! Now is ${products}`);
	}
}

class stateProductsA extends Observerable {
	constructor() {
		super();
		this.state = 0;
	}

	set changeProducts(newState) {
		this.state = newState;
		this.notify();
	}
}

const productsState = new stateProductsA();
const obs1 = new Observer();
const obs2 = new Observer();

productsState.subscribe(obs1);
productsState.changeProducts = 32;
productsState.describe(obs1);
productsState.subscribe(obs2);
productsState.changeProducts = 55;
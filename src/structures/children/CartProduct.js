import { Product } from './Product';

export class CartProduct extends Product {
	constructor(id, name, description, category, price, environmentalImpact, model, image, i18n, quantity) {
		super(id, name, description, category, price, environmentalImpact, model, image, i18n);
		this.quantity = quantity;
	}

	get total() {
		return this.price * this.quantity;
	}

	toJSON() {
		return {
			...super.toJSON(),
			quantity: this.quantity,
		};
	}

	static fromJSON(data) {
		const cartProduct = new CartProduct(
			data.id,
			data.name,
			data.description,
			data.category,
			data.price,
			data.environmentalImpact,
			data.model,
			data.image,
			data.i18n,
			data.quantity || 1,
		);

		return cartProduct;
	}
}

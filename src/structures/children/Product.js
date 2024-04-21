export class Product {
	constructor(id, name, description, category, price, environmentalImpact, model, image, i18n) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.category = category;
		this.price = price;
		this.environmentalImpact = environmentalImpact;
		this.model = model;
		this.image = image;
		this.i18n = i18n;
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			category: this.category,
			price: this.price,
			environmentalImpact: this.environmentalImpact,
			'3dModel': this.model,
			image: this.image,
			i18n: this.i18n,
		};
	}

	static fromJSON(data) {
		const product = new Product(
			data.id,
			data.name,
			data.description,
			data.category,
			data.price,
			data.environmentalImpact,
			data['3dModel'],
			data.image,
			data.i18n,
		);

		return product;
	}
}

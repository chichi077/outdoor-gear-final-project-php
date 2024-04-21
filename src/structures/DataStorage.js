import axios from 'axios';
import { CartController } from './CartController';
import { Product } from './children/Product';
import { User } from './children/User';

const ACTIVITIES_CATEGORIES = {
	hiking: ['sleeping_bags', 'tents', 'backpacks', 'portable_lights', 'tools', 'other'],
	climbing: ['tents', 'backpacks', 'portable_lights', 'tools', 'other'],
	camping: [
		'sleeping_bags',
		'tents',
		'camping_chairs',
		'camping_tables',
		'portable_lights',
		'stoves',
		'coolers',
		'tools',
		'backpacks',
		'other',
	],
};

export class DataStorage {
	constructor() {
		this.data = new Map();
		this.perCategory = new Map();
		this.users = new Map();
		this.cart = new CartController();
	}

	async fetchData() {
		const [productsResponse, usersResponse] = await Promise.all([
			axios.get('/data/products.json'),
			axios.get('/data/users.json'),
		]);
		const mappedProductData = productsResponse.data.products.map((product) => {
			return [product.id, Product.fromJSON(product)];
		});

		const mappedUserData = usersResponse.data.map((user) => {
			return [user.email, User.fromJSON(user)];
		});

		this.data = new Map(mappedProductData);
		this.users = new Map(mappedUserData);

		this.perCategory = new Map();

		for (const product of this.products) {
			if (!product.category) {
				product.category = 'unknown';
			}

			if (!this.perCategory.has(product.category)) {
				this.perCategory.set(product.category, []);
			}

			this.perCategory.get(product.category).push(product);
		}
	}

	getRecommendedProducts(activity, budget = Number.POSITIVE_INFINITY) {
		console.log('Activity:', activity, this.perCategory);
		const products = ACTIVITIES_CATEGORIES[activity].reduce((acc, category) => {
			const hasCategory = this.perCategory.has(category);

			if (!hasCategory) return acc;

			const randomIndex = Math.floor(Math.random() * this.perCategory.get(category).length);

			return [...acc, this.perCategory.get(category)[randomIndex]];
		}, []);

		// eslint-disable-next-line id-length
		const sortedByPrice = products.sort((a, b) => a.price - b.price);

		return sortedByPrice.reduce((acc, product) => {
			const total = acc.reduce((sum, alreadyPresentProduct) => sum + alreadyPresentProduct.price, 0);

			if (total + product.price > budget) return acc;

			return [...acc, product];
		}, []);
	}

	get products() {
		return [...this.data.values()];
	}
}

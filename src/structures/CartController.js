import { safeJsonParse } from '../utils/safeJsonParse';
import { EncryptionController } from './EncyptionController';
import { CartProduct } from './children/CartProduct.js';

export class CartController {
	constructor() {
		/**
		 * @type {Map<string, import('./children/CartProduct.js').CartProduct>}
		 */
		this.cart = new Map();
		this.encryptionController = new EncryptionController();

		this.currentUserEmail = null;
	}

	addToCart(product) {
		const productInCart = this.cart.get(product.id);

		if (productInCart) {
			productInCart.quantity++;
			this.cart.set(product.id, productInCart);
		} else {
			this.cart.set(product.id, CartProduct.fromJSON(product));
		}

		this.saveToLocalStorage();
	}

	updateQuantity(product, quantity) {
		const productInCart = this.cart.get(product.id);

		if (productInCart) {
			productInCart.quantity = quantity;
			this.cart.set(product.id, productInCart);
		}

		this.saveToLocalStorage();

	}

	removeFromCart(product) {
		this.cart.delete(product.id);
		this.saveToLocalStorage();
	}

	getTotal() {
		return this.getCartProducts().reduce((total, product) => total + product.total, 0).toFixed(2);
	}

	getCartProducts() {
		return [...this.cart.values()];
	}

	loadFromLocalStorage(user) {
		const cart = this.encryptionController.getLocalStorageItem([user.email, 'cart'].join('-'));
		this.currentUserEmail = user.email;
		if (!cart) {
			return;
		}

		const parsedCart = safeJsonParse(cart);
		this.cart = new Map(Object.entries(parsedCart).map(([key, value]) => [key, CartProduct.fromJSON(value)]));
	}

	saveToLocalStorage() {
		if (!this.currentUserEmail) {
			return;
		}

		const toSave = this.toSave();
		this.encryptionController.setLocalStorageItem([this.currentUserEmail, 'cart'].join('-'), JSON.stringify(toSave));
	}

	toSave(cart) {
		const effectiveCart = cart || this.cart;

		return [...effectiveCart.entries()].reduce((acc, [key, value]) => {
			acc[key] = value.toJSON();
			return acc;
		}, {});
	}

	resetCart() {
		this.cart = new Map();
		this.currentUserEmail = null;
	}

	adminLoadFromLocalStorage(email) {
		const cart = this.encryptionController.getLocalStorageItem([email, 'cart'].join('-'));
		if (!cart) {
			return new Map();
		}

		const parsedCart = safeJsonParse(cart);
		return new Map(Object.entries(parsedCart).map(([key, value]) => [key, CartProduct.fromJSON(value)]));
	}

	adminUpdateProductQuantity(email, productId, quantity) {
		const cart = this.adminLoadFromLocalStorage(email);
		const product = cart.get(productId);

		if (product) {
			product.quantity = quantity;
			cart.set(productId, product);
		}

		const toSave = this.toSave(cart);
		this.encryptionController.setLocalStorageItem([email, 'cart'].join('-'), JSON.stringify(toSave));
	}

	adminRemoveProduct(email, productId) {
		const cart = this.adminLoadFromLocalStorage(email);
		cart.delete(productId);

		const toSave = this.toSave(cart);
		this.encryptionController.setLocalStorageItem([email, 'cart'].join('-'), JSON.stringify(toSave));
	}
}

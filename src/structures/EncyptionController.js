import { AES, SHA512, enc } from 'crypto-js';
import { SUPER_HYPER_SECURE_ENC_KEY } from '../constants';

export class EncryptionController {
	constructor(parent) {
		this.encrypt = SUPER_HYPER_SECURE_ENC_KEY;
		this.parent = parent;
	}

	setLocalStorageItem(key, value) {
		const encryptedKey = this.hashData(key);

		localStorage.setItem(encryptedKey, this.encryptData(value));
	}

	getLocalStorageItem(key) {
		const encryptedKey = this.hashData(key);

		if (!localStorage.getItem(encryptedKey)) return null;

		return this.decryptData(localStorage.getItem(encryptedKey));
	}

	removeLocalStorageItem(key) {
		const encryptedKey = this.hashData(key);

		localStorage.removeItem(encryptedKey);
	}

	hashData(data) {
		return SHA512(data).toString();
	}

	encryptData(data) {
		return AES.encrypt(data, this.encrypt).toString();
	}

	decryptData(data) {
		return AES.decrypt(data, this.encrypt).toString(enc.Utf8);
	}
}

export const useEncryption = () => {
	return new EncryptionController();
};

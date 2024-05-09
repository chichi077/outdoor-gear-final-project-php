import { useContext } from 'react';
import { AUTH_USER_LOCAL_STORAGE_KEY, GlobalAuthUser, GlobalDataStorage } from '../constants';
import { useEncryption } from '../structures/EncyptionController';
import { safeJsonParse } from '../utils/safeJsonParse';

export function useAuthUser() {
	const encryptionController = useEncryption();
	const storage = useContext(GlobalDataStorage);

	// eslint-disable-next-line @typescript-eslint/consistent-type-imports
	const parsedUser = safeJsonParse(encryptionController.getLocalStorageItem(AUTH_USER_LOCAL_STORAGE_KEY));

	const { authUser, setAuthUser } = useContext(GlobalAuthUser);

	if (!authUser && parsedUser) {
		setAuthUser(parsedUser);
		storage.cart.loadFromLocalStorage(parsedUser);
	}

	return {
		user: parsedUser || authUser,
		setUser: (user) => {
			if (!user) {
				encryptionController.removeLocalStorageItem(AUTH_USER_LOCAL_STORAGE_KEY);
				setAuthUser(null);
				// storage.cart.resetCart();
				return;
			}

			encryptionController.setLocalStorageItem(AUTH_USER_LOCAL_STORAGE_KEY, JSON.stringify({
				sessionId: user
			}));
			setAuthUser(user);
			// .cart.loadFromLocalStorage(user);
		},
	};
}

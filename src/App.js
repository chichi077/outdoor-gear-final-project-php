import React, { useMemo, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AlertWrapper } from './components/alerts/AlertWrapper';
import { GlobalAuthUser, GlobalDataStorage } from './constants';
import { GlobalAlertContext } from './hooks/useAlerts';
import { useStorage } from './hooks/useStorage';
import { router } from './router';

function App() {
	const storage = useStorage();
	console.log('App', storage);

	const [authUser, setAuthUser] = useState(null);
	const [alerts, setAlerts] = useState([]);

	const alertContext = useMemo(
		() => ({
			alerts,
			setAlerts,
		}),
		[alerts],
	);

	const authUserContext = useMemo(
		() => ({
			authUser,
			setAuthUser,
		}),
		[authUser],
	);

	return (
		<GlobalAlertContext.Provider value={alertContext}>
			<GlobalAuthUser.Provider value={authUserContext}>
				<GlobalDataStorage.Provider value={storage.storage}>
					<AlertWrapper />
					<RouterProvider key={storage.status} router={router} />
				</GlobalDataStorage.Provider>
			</GlobalAuthUser.Provider>
		</GlobalAlertContext.Provider>
	);
}

export default App;

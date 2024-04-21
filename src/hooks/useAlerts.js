import { useContext } from 'react';
import { GlobalAlertContext } from '../constants';
import { generateId } from '../utils/generateId';

function useAlerts() {
	const { setAlerts, alerts } = useContext(GlobalAlertContext);

	return {
		alerts,
		addAlert: (data) => {
			const id = generateId();

			setAlerts((prevAlerts) => [
				...prevAlerts,
				{
					message: data.message,
					type: data.type,
					time: 5_000,
					id,
				},
			]);

			setTimeout(() => {
				setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
			}, 5_000);

			return id;
		},
	};
}

export { GlobalAlertContext } from '../constants';
export { useAlerts };

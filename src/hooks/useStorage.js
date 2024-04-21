import { useEffect, useState } from 'react';
import { DataStorage } from '../structures/DataStorage';

export const Status = {
	Loading: 'loading',
	Success: 'success',
	Error: 'error',
};

export function useStorage() {
	const [data, setData] = useState({
		status: Status.Loading,
		storage: new DataStorage(),
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				await data.storage.fetchData();
				console.log('Data loaded', data.storage);
				setData({
					status: Status.Success,
					storage: data.storage,
				});
			} catch (error) {
				console.error(error);
				setData((prev) => ({
					status: Status.Error,
					storage: prev.storage,
				}));
			}
		};

		void fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return data;
}

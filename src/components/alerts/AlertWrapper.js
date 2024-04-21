import React from 'react';
import { useAlerts } from '../../hooks/useAlerts';
import { Alert } from './Alert';

export function AlertWrapper() {
	const { alerts } = useAlerts();

	return (
		<div className="position-fixed bottom-0 start-0 p-4 z-3">
			<div className="d-flex flex-column gap-2">
				{alerts.map((alert) => (
					<Alert key={alert.id} message={alert.message} type={alert.type} />
				))}
			</div>
		</div>
	);
}

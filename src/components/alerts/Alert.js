import React from 'react';

const STYLES = {
	error: 'border-start border-4 border-danger rounded py-3 px-4',
	success: 'border-start border-4 border-success rounded py-3 px-4',
	info: 'border-start border-4 border-info rounded py-3 px-4',
};

export function Alert({ message, type }) {
	const style = STYLES[type];

	return (
		<div
			className={`shadow ${style}`}
			style={{
				backgroundColor: 'rgba(255, 255, 255, 0.95)',
			}}
		>
			{message}
		</div>
	);
}

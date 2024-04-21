import React, { useState } from 'react';

export function Form({ elements, onSubmit }) {
	const [loading, setLoading] = useState(false);
	const onSubmitWrapper = async (event) => {
		setLoading(true);
		// eslint-disable-next-line promise/prefer-await-to-then
		void onSubmit(event)?.finally(() => setLoading(false));
	};

	return (
		<form className="container d-flex flex-column gap-2" onSubmit={onSubmitWrapper}>
			{elements.map((element, index) => (
				<div className="form-floating mb-3" key={index}>
					<input
						className="form-control"
						id={element.name}
						name={element.name}
						placeholder={element.placeholder}
						required={element.required}
						type={element.type}
					/>
					<label htmlFor={element.name}>{element.label}</label>
				</div>
			))}
			<button className="btn btn-primary" disabled={loading} type="submit">
				Submit
			</button>
		</form>
	);
}


import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAlerts } from '../hooks/useAlerts';
import { useAuthUser } from '../hooks/useAuthUser';
import './Login.css';

export default function Login() {
	const { setUser } = useAuthUser();
	const { t } = useTranslation();
	const { addAlert } = useAlerts();

	// Define loginUser state to hold the email and password
	const [loginUser, setLoginUser] = useState({ email: '', password: '' });

	// Define error state to hold potential error messages
	const [error, setError] = useState(''); // <-- This line adds the error state

	const changeHandler = (evt) => {
		setLoginUser((prev) => {
			return { ...prev, [evt.target.name]: evt.target.value };
		});
	};

	const submitHandler = async (evt) => {
		evt.preventDefault();
		const regData = new FormData(evt.target);
		console.log(regData);
		fetch('http://localhost/outdoor-gear-final-project%20(php)/php/classSolution.php/login', {
			method: 'POST',
			body: regData,
		})
			.then(async response => {
				if (response.status === 200) {
					
					const body = await response.text();
					console.log(loginUser);
					setUser(loginUser);
					window.location.href = '/';
				}
			})
			.catch((_error) => {
				setError('Login failed, please try again.');
				console.error('Error:', _error);
			});
	};

	return (
		<div className="App">
			<div className="login-container">
				<div className="login-section">
					<h1>{t('login.title')}</h1>
					{error && <p className="error">{error}</p>} {/* Display error message */}
					<form onSubmit={submitHandler}>
						<input
							name="email"
							onChange={changeHandler}
							placeholder={t('login.emailPlaceholder')}
							required
							type="email"
							value={loginUser.email}
						/>
						<input
							name="password"
							onChange={changeHandler}
							placeholder={t('login.passwordPlaceholder')}
							required
							type="password"
							value={loginUser.password}
						/>
						<button type="submit">{t('login.submit')}</button>
					</form>
				</div>
				<div className="signup-section">
					<h1>{t('login.signup')}</h1>
					<p>{t('login.signupDescription')}</p>
					<p>{t('login.signupBenefit')}</p>
					<p>{t('login.signupBenefit2')}</p>
					<button
						onClick={() => {
							addAlert({
								message: 'Sign up is not available in this demo.',
								type: 'info',
							});
						}}
						type="button"
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}

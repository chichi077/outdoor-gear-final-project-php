import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { LANGUAGES } from '../../constants';
import { useAuthUser } from '../../hooks/useAuthUser';
import i18n from '../../i18n';
import { Route } from '../../structures/Route';

/**
 * @param {Route[]} routes
 * @param {*} user
 * @returns
 */
function filterRoutes(routes, user) {
	return routes.filter((route) => {
		if (!user && route.authenticated) {
			return false;
		}

		if (route.admin) {
			return Boolean(user?.isAdmin);
		}

		return true;
	});
}

export function Header({ title }) {
	const { user, setUser } = useAuthUser();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleLogout = () => {
		setUser(null);
		navigate('/login');
	};

	const onLanguageChange = (event) => {
		i18n.changeLanguage(event.target.value);
	};

	const selectedLanguage = LANGUAGES.find((language) => language.code === i18n.language);

	const filteredRoutes = useMemo(() => {
		const routes = [
			new Route().setPath('/').setLabel(t('header.home')),
			new Route().setPath('/register').setLabel(t('header.register')).setAdmin(),
			new Route().setPath('/interactive').setLabel(t('header.interactive')),
			new Route().setPath('/admin').setLabel(t('header.admin')).setAdmin(),
			new Route().setPath('/products').setLabel(t('header.products')),
			new Route().setPath('/userRegister').setLabel(t('header.userRegister')),
			new Route().setPath('/cart').setLabel(t('header.cart')).setAuthenticated(),
		];

		return filterRoutes(routes, user);
	}, [t, user]);

	return (
		<header className="d-flex justify-content-between p-3 bg-white text-black border-bottom">
			<h1 className="h2 font-weight-bold d-flex align-items-center gap-2">
				{selectedLanguage && (
					<img
						alt={selectedLanguage.name}
						className="p-2 border border-dark-subtle rounded"
						src={selectedLanguage.icon}
						style={{ width: '40px' }}
					/>
				)}
				{title}
			</h1>
			<nav className="d-flex gap-2">
				{filteredRoutes.map((route) => (
					<div className="px-2 py-1 border border-dark rounded d-flex align-items-center" key={route.path}>
						<Link className="text-black m-0 text-decoration-none" to={route.path}>
							{route.label}
						</Link>
					</div>
				))}
				{user ? (
					<div className="px-2 py-1 border border-danger rounded d-flex align-items-center">
						<button className="btn text-danger" onClick={handleLogout} type="button">
							{t('header.logout')}
						</button>
					</div>
				) : (
					<div className="px-2 py-1 border border-dark rounded bg-dark d-flex align-items-center">
						<Link className="text-white text-decoration-none" to="/login">
							{t('header.login')}
						</Link>
					</div>
				)}
				<div className="d-flex gap-2">
					<select className="form-select" id="" name="" onChange={onLanguageChange} value={i18n.language}>
						{LANGUAGES.map((language) => (
							<option key={language.code} selected={language.code === i18n.language} value={language.code}>
								{language.name}
							</option>
						))}
					</select>
				</div>
			</nav>
		</header>
	);
}

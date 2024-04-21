import React from 'react';

export const AUTH_USER_LOCAL_STORAGE_KEY = 'current_auth_user';

export const DATA_PATH = {
	Users: '/data/SUPER_SECURE_USERS_UNHACKABLE.json',
	Products: '/data/AMAZING_PRODUCTS.json',
};

/**
 * @type {React.Context<import('./structures/DataStorage').DataStorage> }
 */
export const GlobalDataStorage = React.createContext(null);

/**
 * @type {React.Context<{ authUser: any, setAuthUser: any }>}
 */
export const GlobalAuthUser = React.createContext(null);

/**
 * @type {React.Context<{ alerts: any, setAlerts: any}>} Alert
 */
export const GlobalAlertContext = React.createContext(null);

export const SUPER_HYPER_SECURE_ENC_KEY =
	'K+i/oJUrthkUe77PDs1SwYIAO3LPFyRu8lSaWT5C9KTdpqnuhce8sHIWxtFEAJ0JFtJMsUvhRRjEmTgQAjpmFdsq1rkNV50JCPCMkukMLFH4hLBZXoN5bQ9rA2B8nfkwpy8+jnyj5UEpE9nwgBzbxwoCBAhbSfmEySrOyBjdw9oy2/rpgcyJeKFKNhBe2OSwda8F7D4VN09IEDvpGkFoSGZ++9M1NCj/mht4FNCLCzbBr/hwp9v7UWjaow+GgKe/K+OC+Tu6gjfwNjSJ97QP2GHMgYAkcSgzc7Zms8YDRIwd5Ls4EdQZ+fsrC0amNSJHVFbLpLxwt5chtzmXpXpnS7LA6mK+YRcs6wkPbuED7K2vIx1I5U97CXgp1d/vQy/zJ922tfqrp8FRqOHE4g2N/RcJgDa1XmwLK3IiDbDaIRqWg4t78wdFShitQ7xYThdd0sn1LE99vkCMbgTcqKUuznkve8axDCYxzyf3PjRwYTlGoTHl0zDcsnyQ761NcWhOdA1lDNnfsmvcvHhV39VAydgWqXUwZSWrnxPlwePad1e4zcO9fuGgJWy8Oh0qiz4b9VSGbBnkcGkteGGa7yVO8c1M71p5TPeG+HYId573Ca1IMgxrP0KuTO7CN/Qn7piUYGB0xPWbWxU2C4Au+64g17g9sAbTRF2JDPupV5kiKKM=';

export const LANGUAGES = [
	{
		code: 'en',
		name: 'English',
		icon: 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/us.svg',
	},
	{
		code: 'ko',
		name: 'Korean',
		icon: 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/kr.svg',
	},
	{
		code: 'pt-BR',
		name: 'Portuguese',
		icon: 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/br.svg',
	},
	{
		code: 'zh-TW',
		name: 'Chinese',
		icon: 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/tw.svg',
	},
];

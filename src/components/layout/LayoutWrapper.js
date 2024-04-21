import React from 'react';
import { useTranslation } from 'react-i18next';
import { Footer } from './Footer';
import { Header } from './header';

export function LayoutWrapper({ children, titleKey }) {
	const { t } = useTranslation();

	return (
		<div className="d-grid min-vh-100 h-100" style={{ gridTemplateRows: 'auto 1fr auto' }}>
			<Header title={t(titleKey)} />
			{children}
			<Footer />
		</div>
	);
}

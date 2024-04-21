import { FacebookLogo, InstagramLogo, TwitterLogo } from '@phosphor-icons/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export function Footer() {
	const { t } = useTranslation();

	return (
		<footer
			className="d-grid gap-3 bg-light text-black p-5 h-100"
			style={{ gridTemplateColumns: '1fr 1px 1fr 1px 1fr' }}
		>
			<div className="d-flex flex-column gap-5">
				<div className="fs-1">{t('footer.title')}</div>
				<div className="d-flex flex-column gap-2">
					<div>52619 Spinka Course, Dannyfort, AL 16976-7623</div>

					<div>OPEN 11:00 ～ 19:00</div>

					<div>TEL +1 (779) 274-6613</div>
				</div>
				<div className="d-flex gap-2">
					<FacebookLogo size={32} />
					<TwitterLogo size={32} />
					<InstagramLogo size={32} />
				</div>
			</div>
			<div className="bg-dark" />
			<div className="d-flex flex-column gap-2">
				<div className="fs-2">{t('footer.menu.title')}</div>
				<div>{t('footer.menu.home')}</div>
				<div>{t('footer.menu.products')}</div>
				<div>{t('footer.menu.interactive')}</div>
				<div>{t('footer.menu.environmental')}</div>
				<div>{t('footer.menu.cart')}</div>
				<div>{t('footer.menu.login')}</div>
			</div>
			<div className="bg-dark" />
			<div className="d-flex flex-column gap-2">
				<div className="fs-2">{t('footer.information.title')}</div>
				<div>{t('footer.information.about')}</div>
				<div>{t('footer.information.contact')}</div>
				<div>{t('footer.information.privacy')}</div>
				<div>{t('footer.information.terms')}</div>
				<div>{t('footer.information.careers')}</div>
			</div>
		</footer>
	);
}

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from './locales/en-US';
import ko from './locales/ko';
import ptBR from './locales/pt-BR';
import zhTW from './locales/zh-TW';

const resources = {
	en: {
		translation: enUS,
	},
	ko: {
		translation: ko,
	},
	'pt-BR': {
		translation: ptBR,
	},
	'zh-TW': {
		translation: zhTW,
	},
};

// Initialize i18n, the internationalization library
// Docs: https://react.i18next.com/latest/usetranslation-hook
i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: 'en', // if you're using a language detector, do not define the lng option
		fallbackLng: 'en',
		supportedLngs: ['en', 'ko', 'pt-BR', 'zh-TW'],
		interpolation: {
			escapeValue: false,
		},
		debug: true,
	});

// eslint-disable-next-line unicorn/prefer-export-from
export default i18n;

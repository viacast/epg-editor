import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const AVAILABLE_LANGUAGES = [
  {
    code: 'pt',
    flag: '🇧🇷',
  },
  {
    code: 'en',
    flag: '🇺🇸',
  },
];

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    supportedLngs: AVAILABLE_LANGUAGES.map(l => l.code),
    fallbackLng: 'pt',
    nonExplicitSupportedLngs: true,
    ns: [
      'gap-options',
      'general',
      'header',
      'menu',
      'messages',
      'modal',
      'program-table',
      'parental-guidance',
    ],
    defaultNS: 'general',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
    },
  });

export { AVAILABLE_LANGUAGES };

export default i18next;

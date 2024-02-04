'use client'
import i18n from 'i18next';
import en_i18 from '../en_Global/en_i18.json'
import fa_i18 from '../fa_Global/fa_i18.json'
import {initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    lng: "en",
    resources: {
      en: {
        trnaslation: en_i18,
      },
      fa: {
        translation: fa_i18,
      },
    },
  });

export default i18n;
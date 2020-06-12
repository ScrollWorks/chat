import en from './en.json';
import es from './es.json';
import { createContext, useContext } from 'react';

export const ENGLISH = 'en';
export const SPANISH = 'es';

export type Language = typeof ENGLISH | typeof SPANISH;

export type LocalizationKey = keyof typeof en;
export const LANGUAGES = { en, es };
// We use dependancy injection for the second paremeter of the translatorFactory
// function in order to make testing easier
export const translatorFactory = (language: Language, languages = LANGUAGES) =>
    (string: LocalizationKey): string => languages[language][string];

const defaultTranslator = translatorFactory(ENGLISH);
export const LocalizationContext = createContext(defaultTranslator);

// Export as hook to make it easier to reuse by the different components
export const useTranslator = (): typeof defaultTranslator => useContext(LocalizationContext);
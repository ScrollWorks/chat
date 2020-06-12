import { translatorFactory } from './index';
import { SPANISH, LANGUAGES } from '../localization';

describe('localization/index', () => {
    describe('translatorFactory function', () => {
        test(`receives a language and returns a function that
        maps string keys to translated versions`, () => {
            const LANGUAGE = SPANISH;
            const STRING = 'title';
            const TRANSLATED_STRING = 'anyTranslatedString';
            const languages = {
                [LANGUAGE]: {
                    [STRING] : TRANSLATED_STRING
                }
            };
            const boundTranslator = translatorFactory(LANGUAGE,
                languages as unknown as typeof LANGUAGES);
            expect(boundTranslator(STRING)).toEqual(TRANSLATED_STRING);
        });
    });
});

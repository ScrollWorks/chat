import React from 'react';
import { shallow } from 'enzyme';
import { PAGE_CHAT, PAGE_SETTINGS, Page } from '../../modules/pages';
import App, { GlobalStyles } from '../App';
import Navigation from '../../containers/Navigation';
import ChatScreen from '../ChatScreen';
import SettingsScreen from '../../containers/SettingsScreen';

import { useTranslator } from '../../localization';

jest.mock('react', () => {
    const originalReact = jest.requireActual('react');
    // mock useEffect so that it calls our callback immediately
    return {
        ...originalReact,
        useEffect: (f: () => void) => f()
    };
});

jest.mock('../../localization');

const setup = () => {
    const props = {
        activePage: PAGE_CHAT as Page,
        init: jest.fn()
    };
    const wrapper = shallow(<App {...props} />);
    return { props, wrapper };
};

describe('App Component', () => {
    const TRANSLATED_STRING = 'adsadas';
    beforeAll(() => {
        // So that we don't depend on specific languages or keys on our language files,
        // we mock the translator function to return a known string if the
        // right key is passed.
        const useTranslatorMock = useTranslator as jest.Mock;
        useTranslatorMock.mockImplementation(() =>
            (key: string) => key === 'title' && TRANSLATED_STRING);
    });
    it('should render self and subcomponents', () => {
        const { wrapper }   = setup();
        expect(wrapper.find(GlobalStyles)).toHaveLength(1);
        expect(wrapper.find(Navigation)).toHaveLength(1);
        expect(wrapper.find(ChatScreen)).toHaveLength(1);
        expect(wrapper.find(SettingsScreen)).toHaveLength(0);
        wrapper.setProps({ activePage: PAGE_SETTINGS as Page });
        expect(wrapper.find(ChatScreen)).toHaveLength(0);
        expect(wrapper.find(SettingsScreen)).toHaveLength(1);
    });
    it('should call init with translated `title` string', () => {
        const { props }   = setup();
        expect(props.init).toHaveBeenCalledWith(TRANSLATED_STRING);
    });
});

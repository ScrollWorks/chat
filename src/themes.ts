import { DefaultTheme } from 'styled-components';

export const THEME_LIGHT = 'lightTheme';
export const THEME_DARK = 'darkTheme';

export type Theme = typeof THEME_LIGHT | typeof THEME_DARK;

// Extend default theme with our properties so we can use default imports
declare module 'styled-components' {
    export interface DefaultTheme {
        spacing: {
            small: string
            regular: string
            big: string
            double: string
            huge: string
        }
        mobileBreakpoint: string
        fontSize: string
        borderRadius: string
        sendingOpacity: number
        maxMessageWidth: string
        boxShadow: string
        navigationFontSize: string
        navigationFontWeight: string
        navigationItemBackground: string
        navigationItemBackgroundFlashing: string
        navigationFlashSpeed: string
        navigationActiveColor: string
        navigationIconSize: string
        navigationIconSizeMobile: string
        navigationHoverTransform: string
        navigationColor: string
        transitionsCurve: string
        outgoingMessageBg: string
        incomingMessageBg: string
        messageDetailsFontSize: string
        messageDetailsFontWeight: string
        messageDetailsPadding: string
        navigationBoxShadow: string
        messageColor: string
        background: string
        copyColor: string
        inputColor: string
        inputBackground: string
        inputFocusBorder: string
        inputPlaceholderOpacity: number
        messageListbg: string
        sendIcon: {
            activeColor: string
            disabledColor: string
        }
        sendIconSize: string
        settingsPageFontSize: string
        buttonBorder: {
            regular: string,
            hover: string
        }
    }
}

const lightTheme: DefaultTheme = {
    spacing: {
        small: '5px',
        regular: '10px',
        big: '15px',
        double: '20px',
        huge: '60px'
    },
    mobileBreakpoint: '768px',
    fontSize: '15px',
    borderRadius: '10px',
    sendingOpacity: .6,
    maxMessageWidth: '70%',
    boxShadow: '1px 1px 1px #999',
    incomingMessageBg: '#dcf8c6',
    outgoingMessageBg: '#fff',
    messageDetailsFontSize: '14px',
    messageDetailsFontWeight: 'bold',
    messageDetailsPadding: '0 25px 3px',
    messageColor: '#555',
    inputColor: '#666',
    inputBackground: '#fff',
    inputPlaceholderOpacity: .5,
    inputFocusBorder: '#AAA',
    background: '#f0f0f0',
    copyColor: '#333',
    messageListbg: '/img/whatsapp-bg.png',
    sendIcon: {
        activeColor: '#333',
        disabledColor: '#999',
    },
    sendIconSize: '26px',
    navigationFontSize: '18px',
    navigationFontWeight: 'bold',
    navigationItemBackground: '#f0f0f0',
    navigationItemBackgroundFlashing: '#ffc984',
    navigationFlashSpeed: '3s',
    navigationColor: '#333',
    navigationActiveColor: '#999',
    navigationIconSize: '30px',
    navigationIconSizeMobile: '25px',
    navigationHoverTransform: 'scale(1.1)',
    navigationBoxShadow: '1px 1px 2px #666',
    transitionsCurve: '200ms ease-out',
    settingsPageFontSize: '18px',
    buttonBorder: {
        regular: '#999',
        hover: '#333'
    }
};

const darkTheme: DefaultTheme = {
    ...lightTheme,
    background: '#333',
    copyColor: '#CCC',
    messageListbg: '/img/whatsapp-bg-dark.png',
    inputColor: '#999',
    inputBackground: '#111',
    inputFocusBorder: '#054640',
    sendIcon: {
        activeColor: '#AAA',
        disabledColor: '#555',
    },
    incomingMessageBg: '#232d36',
    outgoingMessageBg: '#054640',
    messageColor: '#AAA',
    buttonBorder: {
        regular: '#999',
        hover: '#CCC'
    },
    boxShadow: '1px 1px 1px #000',
    navigationItemBackground: '#333',
    navigationBoxShadow: '1px 1px 1px #DDD',
    navigationActiveColor: '#888',
    navigationColor: '#DDD',
    navigationItemBackgroundFlashing: '#6d573b'
};

export const themes = {
    [THEME_LIGHT]: lightTheme,
    [THEME_DARK]: darkTheme,
};
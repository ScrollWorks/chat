import React, { useEffect } from 'react';

import { ReduxProps } from '../containers/App';
import Navigation from '../containers/Navigation';
import ChatScreen from './ChatScreen';
import SettingsScreen from '../containers/SettingsScreen';
import { PAGE_CHAT, PAGE_SETTINGS } from '../modules/pages';
import { useTranslator } from '../localization';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}
    html, body {
        font-family: 'Open Sans', sans-serif;
        font-size: ${({ theme }) => theme.fontSize};
        background: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.copyColor};
        height: 100%;
    }
    #react-container {
        display: flex;
        flex-direction: columnd;
        height: 100%;
    }
    main {
        flex: 1;
    }
    @keyframes colorFlash {
        0%, 80% {
            background-color: ${({ theme }) => theme.navigationItemBackground};
        }
        5% {
            background-color: ${({ theme }) => theme.navigationItemBackgroundFlashing};
        }
    }
`;

const App = ({ activePage, init } : ReduxProps): JSX.Element => {
    const t = useTranslator();
    useEffect(() => {
        init(t('title'));
    }, []);
    return <>
        <GlobalStyles />
        <Navigation />
        {({
            [PAGE_CHAT]: <ChatScreen />,
            [PAGE_SETTINGS]: <SettingsScreen />,
        })[activePage]}
    </>;
};

export default App;
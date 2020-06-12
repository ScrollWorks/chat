import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './containers/App';
import ThemeProvider from './contextProviders/ThemeProvider';
import LocalizationProvider from './contextProviders/LocalizationProvider';

// Wrap our App component with three context providers - redux store,
// theme, and localization
ReactDOM.render(
    <Provider store={store}>
        <LocalizationProvider>
            <ThemeProvider>
                <App/>
            </ThemeProvider>
        </LocalizationProvider>
    </Provider>,
    document.getElementById('react-container'));

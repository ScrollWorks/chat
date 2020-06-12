import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { SETTING_THEME } from '../modules/settings';
import { themes } from '../themes';
import { RootState } from '../store';

const mapState = (state: RootState) => {
    return {
        theme: themes[state.settings[SETTING_THEME]]
    };
};

const connector = connect(mapState);

export default connector(ThemeProvider);

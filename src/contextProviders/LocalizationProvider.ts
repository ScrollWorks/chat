import { connect } from 'react-redux';

import { LocalizationContext, translatorFactory } from '../localization';
import { RootState } from '../store';
import { SETTING_LANGUAGE } from '../modules/settings';

const mapState = (state: RootState) => {
    return {
        value: translatorFactory(state.settings[SETTING_LANGUAGE])
    };
};

const connector = connect(mapState);

export default connector(LocalizationContext.Provider);

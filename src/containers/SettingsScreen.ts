import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import SettingsScreen from '../components/SettingsScreen';
import { SettingName, updateSetting, resetSettings } from '../modules/settings';
import { RootState } from '../store';

const mapState = (state: RootState) => {
    return {
        currentValues: state.settings
    };
};

const mapDispatch = (dispatch: Dispatch) => {
    return {
        onReset: () => dispatch(resetSettings()),
        onSettingUpdate: (setting: SettingName, value: string) =>
            dispatch(updateSetting(setting, value))
    };
};

const connector = connect(mapState, mapDispatch);

export type ReduxProps = ConnectedProps<typeof connector>
export default connector(SettingsScreen);

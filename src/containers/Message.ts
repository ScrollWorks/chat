import { connect, ConnectedProps } from 'react-redux';

import Message from '../components/Message';

import { RootState } from '../store';
import { SETTING_USERNAME, SETTING_CLOCK24 } from '../modules/settings';

const mapState = (state: RootState) => {
    return {
        localUser: state.settings[SETTING_USERNAME],
        clockStyle: state.settings[SETTING_CLOCK24]
    };
};

const connector = connect(mapState);

export type ReduxProps = ConnectedProps<typeof connector>
export default connector(Message);

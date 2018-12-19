import * as React from 'react';
import {connect} from 'react-redux';
import styles from './InputPanel.less';


export const mapDispatchToProps = (dispatch) => ({
    sendMessage: (message) =>
        dispatch({
            type: 'SEND_MESSAGE',
            message
        })
});

class InputPanel extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            message: ''
        }
    }

    sendMessage() {
        this.props.sendMessage(this.state.message)
    }


    render() {
        return (
            <div className={styles.inputPanel}>
                <div>TextField</div>
                <div>SendButton</div>
            </div>
        );
    }
};

export default connect(() => ({}),mapDispatchToProps)(InputPanel);
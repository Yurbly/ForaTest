import * as React from 'react';
import {connect} from 'react-redux';
const styles = require('./Message.less');

const Message = (props) => {

    return (
        <div className={styles.message}>
            <div className={styles.name}>{`${props.message.name} said at ${props.message.date}`}</div>
            <div className={styles.text}>{props.message.text}</div>
        </div>
    );
};

export default Message;
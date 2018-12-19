import * as React from 'react';
const styles = require('./Message.less');
import dateformat from 'dateformat';


const Message = (props) => {
    const date = dateformat(new Date(props.message.date), 'h:MM:ss d.mm.yyyy');
    return (
        <div className={styles.message}>
            <div className={styles.messageInfo}>{`${props.message.author} said at ${date}:`}</div>
            <div className={styles.text}>{props.message.text}</div>
        </div>
    );
};

export default Message;
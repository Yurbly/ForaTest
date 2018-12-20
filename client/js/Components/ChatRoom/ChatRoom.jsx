import * as React from 'react';
import styles from './ChatRoom.less';
import Header from '../Header/Header';
import MessageContainer from '../MessageContainer/MessageContainer';
import InputPanel from '../InputPanel/InputPanel';

class ChatRoom extends React.Component {

    constructor() {
        super();
        this.state = {
            endpoint: "http://localhost:9001",
            color: 'white'
        }
    }

    render() {
        return (
            <div className={styles.chatRoom}>
                <Header />
                <MessageContainer />
                <InputPanel />
            </div>
        );
    }
};

export default ChatRoom;
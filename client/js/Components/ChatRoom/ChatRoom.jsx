import * as React from 'react';
import styles from './ChatRoom.less';
import Header from '../Header/Header';
import MessageContainer from '../MessageContainer/MessageContainer';
import InputPanel from '../InputPanel/InputPanel';
import socketIOClient from "socket.io-client";
import {ENDPOINT} from "../../common/constants";

const ChatRoom = () => {


    return (
        <div className={styles.chatRoom}>
            <Header />
            <MessageContainer />
            <InputPanel />
        </div>
    );
};

export default ChatRoom;
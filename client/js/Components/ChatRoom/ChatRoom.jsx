import * as React from 'react';
import {connect} from 'react-redux';
import styles from './ChatRoom.less';
import Header from '../Header/Header';
import MessageContainer from '../MessageContainer/MessageContainer';
import InputPanel from '../InputPanel/InputPanel';
import socketIOClient from "socket.io-client";

export const mapDispatchToProps = (dispatch) => ({
    uploadTodos: (todos) =>
        dispatch({
            type: 'GET_ALL',
            todos
        })
});



class ChatRoom extends React.Component {

    constructor() {
        super();
        this.state = {
            endpoint: "http://localhost:9001",
            color: 'white'
        }
    }

    send = () => {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('change color', this.state.color);
    };

    setColor = (color) => {
        this.setState({ color })
    };

    render() {

        const socket = socketIOClient(this.state.endpoint);

        socket.on('change color', (color) => {
            document.body.style.backgroundColor = color
        });

        return (
            <div className={styles.chatRoom}>
                <Header />
                <MessageContainer />
                <InputPanel />
            </div>
        );
    }
};

export default connect(() => ({}),mapDispatchToProps)(ChatRoom);
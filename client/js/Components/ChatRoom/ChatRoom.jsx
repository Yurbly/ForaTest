import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import socketIOClient from "socket.io-client";
import {ENDPOINT} from "../../common/constants";
import Header from '../Header/Header';
import MessageContainer from '../MessageContainer/MessageContainer';
import InputPanel from '../InputPanel/InputPanel';
const styles = require('./ChatRoom.less');


const mapDispatchToProps = (dispatch) => ({
    setRoom: (roomInfo) =>
        dispatch({
            type: 'SET_ROOM',
            roomInfo
        }),
    sendMessage: (message) =>
        dispatch({
            type: 'ADD_MESSAGE',
            message: message
        })
});

class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
        this.socket = socketIOClient(ENDPOINT, {'force new connection': true});
        let roomId;
        this.socket.on('connect', () => {
            roomId = props.location.search.slice(8);
            this.socket.emit('join', roomId);
        });
        this.socket.on('joined', (roomInfo) => {
            props.setRoom({...roomInfo, roomId});
        });
        this.socket.on('message', (message) => {
            props.sendMessage(message);
        });
    }

    render() {
        return (
            <div className={styles.chatRoom}>
                <Header />
                <MessageContainer socket={this.socket} />
                <InputPanel socket={this.socket}/>
            </div>
        );
    }
}

export default withRouter(connect(() => ({}),mapDispatchToProps)(ChatRoom));

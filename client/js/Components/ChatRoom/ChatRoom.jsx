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
        }),
    setUser: (user) =>
        dispatch({
            type: 'SET_USER',
            user
        })
});

const mapStateToProps = (state) => ({
    user: state.user,
});

class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
        this.socket = socketIOClient(ENDPOINT, {'force new connection': true});
        let roomId;
        let user = props.user;
        if(!user || user === 'Anonymous') {
            user = prompt('Enter your name, please', '')
        }
        this.socket.on('connect', () => {
            roomId = props.location.search.slice(8);
            this.socket.emit('join', roomId, user);
        });
        this.socket.on('joined', (roomInfo) => {
            props.setRoom({...roomInfo, roomId});
        });
        this.socket.on('message', (message) => {
            props.sendMessage(message);
        });
        props.setUser(user);
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatRoom));

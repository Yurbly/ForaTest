import * as React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import socketIOClient from "socket.io-client";
import { ENDPOINT} from "../../common/constants";

import styles from './Login.less';


export const mapDispatchToProps = (dispatch) => ({
    setUser: (userName) =>
        dispatch({
            type: 'SET_USER',
            userName
        }),
    setRoomName: (roomName) =>
        dispatch({
            type: 'SET_ROOM_NAME',
            roomName
        })
});

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            name: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            name: event.target.value
        })
    };

    handleEnterNewChat = () => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('connectToRoom', (roomName) => {
            this.props.setRoomName(roomName);
            this.props.setUser(this.state.name);
        });
    };

    render() {

        return (
            <div className={styles.entrance}>
                <h2>Welcome to ChatCreator</h2>
                <h4>To create a new chat room enter your name and hit 'Enter new chat'</h4>
                <TextField
                    id="outlined-bare"
                    className={styles.textField}
                    margin="normal"
                    variant="outlined"
                    multiline
                    onChange={this.handleChange}
                />
                <Button variant="contained" onClick={this.handleEnterNewChat}>
                    Enter new chat
                </Button>
            </div>
        );
    }
}

export default connect(() => ({}),mapDispatchToProps)(Login);
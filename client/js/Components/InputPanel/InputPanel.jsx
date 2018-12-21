import * as React from 'react';
import {connect} from 'react-redux';
import Send from "@material-ui/icons/send";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import styles from './InputPanel.less';
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => ({
    user: state.user,
    roomId: state.room.roomId
});

class InputPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messageText: ''
        }
    }

    sendMessage = () => {

        const message = {
            author: this.props.user.name,
            text: this.state.messageText,
            date: new Date()
        };
        this.props.socket.emit('message', message, this.props.roomId);
        this.setState({
            messageText: ''
        });
        const input = document.querySelectorAll('[rows="1"]');
        if (input && input.length >= 3){
            (input[2]).focus();
        }
    };

    handleChange = (event) => {
        this.setState({
            messageText:event.target.value
        })
    };

    render() {
        return (
            <div className={styles.inputPanel}>
                <TextField
                    id="outlined-bare"
                    value={this.state.messageText}
                    className={styles.textField}
                    margin="normal"
                    variant="outlined"
                    multiline
                    onChange={this.handleChange}
                />
                <IconButton className={styles.icon}>
                    <Send onClick={this.sendMessage}/>
                </IconButton>
            </div>
        );
    }
};

export default withRouter(connect(mapStateToProps)(InputPanel));
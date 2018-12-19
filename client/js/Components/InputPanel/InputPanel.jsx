import * as React from 'react';
import {connect} from 'react-redux';
import Send from "@material-ui/icons/send";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import styles from './InputPanel.less';


export const mapDispatchToProps = (dispatch) => ({
    sendMessage: (message) =>
        dispatch({
            type: 'ADD_MESSAGE',
            message
        })
});

const mapStateToProps = (state) => ({
    user: state.user
});

class InputPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    sendMessage = () => {
        const message = {
            author: this.props.user.name,
            text: this.state.text,
            date: new Date()
        };
        this.props.sendMessage(message)
    };

    handleChange = (event) => {
        this.setState({
            text:event.target.value
        })
    };

    render() {
        return (
            <div className={styles.inputPanel}>
                <TextField
                    id="outlined-bare"
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

export default connect(mapStateToProps, mapDispatchToProps)(InputPanel);
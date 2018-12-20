import * as React from 'react';
import {connect} from 'react-redux';
import ChatRoom from '../ChatRoom/ChatRoom';
import {withRouter} from "react-router-dom";
const styles = require('./MainContent.less');


const mapDispatchToProps = (dispatch) => ({
    uploadMessages: (messages) =>
        dispatch({
            type: 'UPLOAD_MESSAGES',
            messages
        }),
    setUser: (userName) =>
        dispatch({
            type: 'SET_USER',
            userName
        })
});

const mapStateToProps = (state) => ({
    userName: state.user.name
});

class MainContent extends React.Component {

    constructor(props) {
        super(props);
        console.log("in mainCont!!!!!!!!!!");
    }
    render() {

        return (
            <div className={styles.mainContent}>
                 <ChatRoom />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainContent));

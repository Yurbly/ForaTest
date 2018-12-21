import * as React from 'react';
import styles from './Header.less';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => ({
  user: state.user
});




const Header = (props) => {


    return (
        <div className={styles.header}>
            <h3 className={styles.chatName}>Chatroom</h3>
            <span className={styles.userName}>{`You are logged in as ${props.user}`}</span>
        </div>
    );
};

export default withRouter(connect(mapStateToProps)(Header));
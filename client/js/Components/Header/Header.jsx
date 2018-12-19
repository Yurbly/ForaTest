import * as React from 'react';
import styles from './Header.less';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.user
});

const Header = (props) => {
    return (
        <div className={styles.header}>
            <h2 className={styles.chatName}>Chatroom</h2>
            <span className={styles.userName}>{props.user.name}</span>
        </div>
    );
};

export default connect(mapStateToProps)(Header);
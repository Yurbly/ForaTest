import * as React from 'react';
import styles from './Header.less';

const Header = () => {

    return (
        <div className={styles.header}>
            <h2 className={styles.chatName}>Chatroom</h2>
        </div>
    );
};

export default Header;
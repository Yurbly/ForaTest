import * as React from 'react';
import {Provider} from 'react-redux';
import MainContent from "../MainContent/MainContent";
import configureStore from '../../reducers/configureStore';
import socketIOClient from 'socket.io-client';

const styles = require('./App.less');

const store = configureStore();

const App = () => {

        return (
            <Provider store={store}>
                <div className={styles.app}>
                    <MainContent/>
                </div>
            </Provider>
        );
};

export default App;
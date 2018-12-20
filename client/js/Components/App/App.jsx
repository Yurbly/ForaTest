import * as React from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainContent from "../MainContent/MainContent";
import configureStore from '../../reducers/configureStore';
import Login from '../Login/Login';

const styles = require('./App.less');

const store = configureStore();

const App = () => {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className={styles.app}>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route path='/chat' component={MainContent}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
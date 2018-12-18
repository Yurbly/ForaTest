import {createStore} from "redux";
import rootReducer from './index';

const configureStore = () => {
    return createStore(rootReducer, /* preloadedState, */window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};

export default configureStore;

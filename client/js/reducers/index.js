import { combineReducers } from 'redux';
import messages from './messages'

const rootReducer = combineReducers({
    messages: messages
});

export default rootReducer;

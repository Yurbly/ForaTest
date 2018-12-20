import { combineReducers } from 'redux';
import messages from './messages';
import user from './user';
import room from './room';

const rootReducer = combineReducers({
    messages,
    user,
    room
});

export default rootReducer;

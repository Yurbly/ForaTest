const SET_USER = 'SET_USER';
const defaultUser = 'Anonymous';

const user = (state = defaultUser, action) => {
    switch(action.type) {

        case SET_USER:
            return action.user;
        default:
            return state;
    }
};

export default user;
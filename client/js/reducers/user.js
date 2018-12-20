const SET_USER = 'SET_USER';
const defaultUser = {name: 'Anonymous'};

const user = (state = defaultUser, action) => {
    switch(action.type) {

        case SET_USER:
            return {
                ...state,
                user: action.user
            };

        default:
            return state;
    }
};

export default user;
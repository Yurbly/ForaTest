const SET_USER = 'SET_USER';
const defaultUser = {name: 'Anonymous'};

const user = (state = defaultUser, action) => {
    switch(action.type) {

        case SET_USER:
            return {
                ...state,
                name: action.userName
            };

        default:
            return state;
    }
};

export default user;
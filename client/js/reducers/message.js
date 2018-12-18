const UPLOAD_MESSAGES = 'UPLOAD_MESSAGES';

const defaultState = [];

const message = (state = defaultState, action) => {
    switch(action.type) {
        case UPLOAD_MESSAGES:
            return {
                ...state,
                messages: action.messages
            };

        default:
            return state;
    }
};

export default message;
export const sendMessage = (message) => {
    return (dispatch) => {
        dispatch({
            type: 'ADD_MESSAGE',
            message
        });
    }
};


import React from 'react';

const Dispatch = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'NEW_LIST':
            return { list: action.payload };
        case 'NEW_CHAR_INFO':
            const list = [...state.list];
            const i = list.findIndex(el => el.id === action.charId);
            list[i] = { ...list[i], info: action.payload };
            return { list };
        default:
            return state;
    }
}

export default Dispatch;
export { Dispatch, reducer };

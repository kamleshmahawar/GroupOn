const initialState = {
    data: [],
    selectedBook: {},
}


export const dataReducer = function (state = { ...initialState }, action) {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, data: action.data, selectedBook: {} };
        case 'FETCH_BOOK_DETAILS': {
            return { ...state, selectedBook: action.data };
        }
        case 'DELETE_BOOK': {
            return { ...state, selectedBook: {} };
        }
        default:
            return { ...state };
    }
}
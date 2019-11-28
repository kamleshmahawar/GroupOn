import axios from "axios";
var config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
};

const url = '/api/v1/books';
export const fetchBooks = () => (dispatch) => {
    axios.get(url, config).then(function (resp) {
        dispatch({ type: 'FETCH_DATA', data: resp.data.books })
    })
}

export const fetchBookDetail = (id) => (dispatch) => {
    axios.get(url + '/' + id, config).then(function (resp) {
        dispatch({ type: 'FETCH_BOOK_DETAILS', data: resp.data.book })
    })
}

export const updateBook = (book) => (dispatch) => {
    return axios.put(url + '/' + book.isbn, { book }).then(function (resp) {
        dispatch({ type: 'FETCH_BOOK_DETAILS', data: book })
    });
}

export const createBook = (book) => (dispatch) => {
    return axios.post(url, { book }).then(function (resp) {
        dispatch({ type: 'FETCH_DATA', data: resp.data.books })
    });
}

export const removeBook = (id) => (dispatch) => {
    return axios.delete(url + '/' + id, config).then(function (resp) {
        dispatch({ type: 'FETCH_DATA', data: resp.data.books });
    })
}


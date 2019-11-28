import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import './assets/index.scss';
import { dataReducer } from './reducers/reducer';
import thunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(dataReducer, applyMiddleware(thunk));

class Main extends Component {
    render() {
        return <Provider store={store}>
            <App />
        </Provider>;
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

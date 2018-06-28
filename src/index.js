import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import store from './store/index.js'

import App from './containers/App.js'

import './styles/index.css'
import registerServiceWorker from './registerServiceWorker.js';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

window.store = store
registerServiceWorker();

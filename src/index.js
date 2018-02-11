import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import socketMiddleware from './store/socket-middleware'
import reducers, { initialState } from './store/reducers'

const store = createStore(reducers, initialState, applyMiddleware(socketMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)

registerServiceWorker();

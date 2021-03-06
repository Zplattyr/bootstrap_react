import App from './App';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import FirebaseUpdate from './firebase/firebase'



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <FirebaseUpdate />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

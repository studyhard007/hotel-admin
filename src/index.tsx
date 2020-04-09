import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginStore from './store';
import { Provider } from 'mobx-react';
import * as serviceWorker from './serviceWorker';
const rootStore = {
  loginstore: new LoginStore()
}
ReactDOM.render( <Provider {...rootStore}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

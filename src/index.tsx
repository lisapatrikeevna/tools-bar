import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./bll/store";
import {HashRouter} from "react-router-dom";
import firebase from "firebase"
import 'firebase/auth'


export const app=firebase.initializeApp({
    apiKey: "AIzaSyDGqV4nDHMokspRbNj9OufL531PwdNB2sc",
    authDomain: "fir-silky.firebaseapp.com",
    databaseURL: "https://fir-silky-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fir-silky",
    storageBucket: "fir-silky.appspot.com",
    messagingSenderId: "459950163847",
    appId: "1:459950163847:web:bcbb780902e981920cb522"
})
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
            <App/>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

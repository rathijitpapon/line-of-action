import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import 'reactjs-popup/dist/index.css';
import {toast} from "react-toastify";
import App from './App';

toast.configure();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import dotenv from 'dotenv';
dotenv.config();
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
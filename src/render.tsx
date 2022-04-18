import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost} from './Redux/store'

export const renderEntireTree = (state: any) => {
    ReactDOM.render(
        <App
            state={state}
            addPost={addPost}
        />,
        document.getElementById('root'));
}


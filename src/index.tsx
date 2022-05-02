import { state, stateType, subscribe } from './Redux/store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { addMessage, addPost, updateNewMessageText, updateNewPostText } from './Redux/store';

const renderEntireTree = (state: stateType) => {
  ReactDOM.render(
    <App
      state={state}
      addPost={addPost}
      updateNewPostText={updateNewPostText}
      addMessage={addMessage}
      updateNewMessageText={updateNewMessageText}
    />,
    document.getElementById('root'));
};

renderEntireTree(state);

subscribe(renderEntireTree)
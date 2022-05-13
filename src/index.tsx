import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store, stateType } from './Redux/state';

const renderEntireTree = (state: stateType) => {
  ReactDOM.render(
    <App
      state={state}
      dispatch={store.dispatch.bind(store)}
    />,
    document.getElementById('root'));
};

renderEntireTree(store.getState());

store.subscribe(renderEntireTree);
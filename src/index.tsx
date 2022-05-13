import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store, stateType } from './Redux/state';
import { BrowserRouter } from 'react-router-dom';

const renderEntireTree = (state: stateType) => {
  ReactDOM.render(
    <BrowserRouter>
      <App
        state={state}
        dispatch={store.dispatch.bind(store)}
      />,
    </BrowserRouter>,
    document.getElementById('root'));
};

renderEntireTree(store.getState());

store.subscribe(renderEntireTree);
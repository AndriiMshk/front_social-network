import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { stateType, storeType } from './Redux/store';
import { BrowserRouter } from 'react-router-dom';
import { store } from './Redux/redux-store';


const renderEntireTree = (store: any) => {
  ReactDOM.render(
    <BrowserRouter>
      <App
        store={store}
        // dispatch={store.dispatch.bind(store)}
      />,
    </BrowserRouter>,
    document.getElementById('root'));
};

renderEntireTree(store);

store.subscribe(() => {
  // const state = store.getState()
  renderEntireTree(store)
});


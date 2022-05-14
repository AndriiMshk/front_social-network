import { combineReducers, createStore } from 'redux';
import { sidebarReducer } from './sidebarReduc';
import { profileReducer } from './profileReduc';
import { messageReducer } from './messageReduc';

const reducers = combineReducers(
  {
    sidebar: sidebarReducer,
    profile: profileReducer,
    dialogs: messageReducer,
  },
);

export const store = createStore(reducers);
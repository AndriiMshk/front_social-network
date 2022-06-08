import { combineReducers, createStore } from 'redux';
import { sidebarReducer } from './sidebarReduc';
import { profileReducer } from './profileReduc';
import { messageReducer } from './messageReduc';
import { usersReducer } from './users-reduc';
import { authReducer } from './auth-reducer';

const reducers = combineReducers(
  {
    sidebar: sidebarReducer,
    profile: profileReducer,
    dialogs: messageReducer,
    usersPage: usersReducer,
    auth: authReducer,
  },
);

export const store = createStore(reducers);

// dobavil type sam ))
export const stateFromRedux = store.getState();
export const usersFromRedux = stateFromRedux.usersPage;

export type StateTypeFromRedux = typeof stateFromRedux
export type UsersTypeFromRedux = typeof usersFromRedux

export type UserType = {
  name: string
  id: number
  uniqueUrlName: string
  photos: {
    small: string
    large: string
  },
  status: string
  followed: boolean

}

//@ts-ignore
window.store = store;


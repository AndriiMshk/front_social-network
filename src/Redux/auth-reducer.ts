import { authAPI } from '../api/api';
import { Dispatch } from 'redux';
import { DispatchType } from './store';
import { stopSubmit } from 'redux-form';
import axios from 'axios';

const initialState = {
  userId: null,
  email: '',
  login: '',
  isAuth: false,
  isFetching: false,
};

export const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case 'auth/SET-USER-DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const setUserAuthDataAC = (
  userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (
  { type: 'auth/SET-USER-DATA', payload: { userId, email, login, isAuth } } as const);

export const authMeTC = () => async(dispatch: Dispatch) => {
  try {
    const data = await authAPI.authGetRequest();
    console.log(data);
    if (data.resultCode === 0) {
      const { id, login, email } = data.data;
      dispatch(setUserAuthDataAC(id, email, login, true));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
};

export const loginTC = (email: string, password: string, rememberMe: boolean = false) =>
  async(dispatch: DispatchType) => {
    try {
      const res = await authAPI.loginRequest(email, password, rememberMe);
      if (res.data.resultCode === 0) {
        dispatch(authMeTC());
      } else {
        const errorMessage = res.data.messages.length ? res.data.messages[0] : 'some error';
        dispatch(stopSubmit('login', { _error: errorMessage }));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.warn(error.message);
      }
    }
  };

export const logoutTC = () =>
  async(dispatch: Dispatch) => {
    try {
      const res = await authAPI.logoutRequest();
      if (res.data.resultCode === 0) {
        dispatch(setUserAuthDataAC(null, null, null, false));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.warn(error.message);
      }
    }
  };

interface initialStateType {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean,
  isFetching: boolean,
}

type setUserAuthDataACType = ReturnType<typeof setUserAuthDataAC>
export type ActionType = setUserAuthDataACType
import { authAPI, securityAPI } from '../api/api';
import { Dispatch } from 'redux';
import { DispatchType } from './store';
import { stopSubmit } from 'redux-form';
import axios from 'axios';

const initialState = {
  userId: null as number | null,
  email: '' as string | null,
  login: '' as string | null,
  isAuth: false,
  isFetching: false,
  captchaUrl: null as string | null,
};

export const authReducer = (
  state: InitialStateType = initialState, action: setUserAuthDataACType): InitialStateType => {
  switch (action.type) {
    case 'auth/SET-USER-DATA':
      return { ...state, ...action.payload };
    case 'auth/GET-CAPTCHA':
      return { ...state, captchaUrl: action.captchaUrl };
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

export const getCaptchaUrlAC = (captchaUrl: string) => ({ type: 'auth/GET-CAPTCHA', captchaUrl } as const);

export const loginTC = (email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) =>
  async(dispatch: DispatchType) => {
    try {
      const res = await authAPI.loginRequest(email, password, rememberMe, captcha);
      if (res.data.resultCode === 0) {
        dispatch(authMeTC());
      } else if (res.data.resultCode === 10) {
        dispatch(getCaptchaTC());
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

export const getCaptchaTC = () =>
  async(dispatch: Dispatch) => {
    try {
      const res = await securityAPI.getCaptcha();
      dispatch(getCaptchaUrlAC(res.data.url));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.warn(error.message);
      }
    }
  };

type InitialStateType = typeof initialState

type setUserAuthDataACType =
  | ReturnType<typeof setUserAuthDataAC>
  | ReturnType<typeof getCaptchaUrlAC>

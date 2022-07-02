import { authAPI } from '../api/api';
import { AnyAction, Dispatch } from 'redux';
import { StateTypeFromRedux } from './redux-store';
import { ThunkDispatch } from 'redux-thunk';
import { stopSubmit } from 'redux-form';

interface initialStateType {
  userId: number | null
  email: string | null
  login: string  | null
  isAuth: boolean,
  isFetching: boolean,
}

const initialState = {
  userId: null,
  email: '',
  login: '',
  isAuth: false,
  isFetching: false,
};

export type ActionType = setUserAuthDataACType

export const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case 'SET-USER-DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

type setUserAuthDataACType = ReturnType<typeof setUserAuthDataAC>

export const setUserAuthDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (
  { type: 'SET-USER-DATA', payload: { userId, email, login, isAuth } } as const);

export const authMeTC = () => {
  return (dispatch: Dispatch) => {
    authAPI.authGetRequest()
      .then((data) => {
        if (data.resultCode === 0) {
          const { id, login, email } = data.data;
          dispatch(setUserAuthDataAC(id, email, login, true));
        }
      });
  };
};

export const loginTC = (email: string, password: string, rememberMe: boolean = false) => (
  (dispatch: ThunkDispatch<StateTypeFromRedux, unknown, AnyAction>) => {
    //типизацию спиздил из тудулиста и не понятно что она сука делает
    authAPI.loginRequest(email, password, rememberMe)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(authMeTC());
        } else {
          const errorMessage = res.data.messages.length ? res.data.messages[0] : "some error"
          dispatch(stopSubmit('login', {_error: errorMessage}))
        }
      });
  });

export const logoutTC = () => (
  (dispatch: Dispatch) => {
    authAPI.logoutRequest()
      .then(res=> {
        if (res.data.resultCode === 0) {
          dispatch(setUserAuthDataAC(null, null, null, false));
        }
      });
  });
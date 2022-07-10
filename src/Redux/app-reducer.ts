import { AnyAction } from 'redux';
import { authMeTC } from './auth-reducer';
import { ThunkDispatch } from 'redux-thunk';
import { StateTypeFromRedux } from './redux-store';

interface initialStateType {
  isInitialize: boolean
}

const initialState = {
  isInitialize: false,
};

export type ActionType = SetInitializeACType

export const appReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case 'APP/SET-INITIALIZE':
      return { ...state, isInitialize: true };
    default:
      return state;
  }
};

type SetInitializeACType = ReturnType<typeof setInitializeAC>

export const setInitializeAC = () => (
  { type: 'APP/SET-INITIALIZE'} as const);

export const setInitializeTC = () => {
  return (dispatch: ThunkDispatch<StateTypeFromRedux, unknown, AnyAction>) => {
    Promise.all([dispatch(authMeTC())])
      .then(() => {
        dispatch(setInitializeAC());
      });
  };
};
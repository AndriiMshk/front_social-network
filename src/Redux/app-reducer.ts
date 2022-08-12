import { authMeTC } from './auth-reducer';
import { DispatchType } from './store';

const initialState = {
  isInitialize: false,
  error: '',
};

export const appReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case 'app/SET-INITIALIZE':
      return { ...state, isInitialize: true };
    case 'app/SET-ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const setInitializeAC = () => (
  { type: 'app/SET-INITIALIZE' } as const);

export const setErrorAC = (error: string) => (
  { type: 'app/SET-ERROR', error } as const);

export const setInitializeTC = () => (dispatch: DispatchType) => {
  Promise.all([dispatch(authMeTC())])
    .then(() => {
      dispatch(setInitializeAC());
    });
};

type SetInitializeACType = ReturnType<typeof setInitializeAC>
type setErrorACType = ReturnType<typeof setErrorAC>
export type ActionType =
  | SetInitializeACType
  | setErrorACType
type initialStateType = typeof initialState
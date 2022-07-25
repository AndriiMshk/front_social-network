import { authMeTC } from './auth-reducer';
import { DispatchType } from './store';

const initialState = {
  isInitialize: false,
};

export const appReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case 'app/SET-INITIALIZE':
      return { ...state, isInitialize: true };
    default:
      return state;
  }
};

export const setInitializeAC = () => (
  { type: 'app/SET-INITIALIZE' } as const);

export const setInitializeTC = () => (dispatch: DispatchType) => {
  Promise.all([dispatch(authMeTC())])
    .then(() => {
      dispatch(setInitializeAC());
    });
};

type SetInitializeACType = ReturnType<typeof setInitializeAC>
export type ActionType = SetInitializeACType
type initialStateType = typeof initialState
interface initialStateType {
  userId: number | null
  email: string,
  login: string,
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

type ActionType = setUserAuthDataACType

export const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case 'SET-USER-DATA':
      return { ...state, ...action.payload, isAuth: true };
    default:
      return state;
  }
};

type setUserAuthDataACType = ReturnType<typeof setUserAuthDataAC>

export const setUserAuthDataAC = (userId: number, email: string, login: string) => (
  { type: 'SET-USER-DATA', payload: { userId, email, login } } as const);
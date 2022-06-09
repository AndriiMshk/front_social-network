const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false,
};

type ActionType = setUserAuthDataACType

export const authReducer = (state = initialState, action: ActionType) => {
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
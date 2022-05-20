const initialState = {
  users: [],
};

type actionType = followACType | unFollowACType | setUsersACType

export const usersReducer = (
  state: any = initialState,
  action: actionType) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user: any) => user.id === action.payload.id ? { ...user, followed: true } : user),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user: any) => user.id === action.payload.id ? { ...user, followed: false } : user),
      };
    case SET_USERS:
      return { ...state, users: [...state.users, ...action.users] };
    default:
      return state;
  }
};

type followACType = ReturnType<typeof followAC>
type unFollowACType = ReturnType<typeof unFollowAC>
type setUsersACType = ReturnType<typeof setUsersAC>

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

export const followAC = (userId: number) => ({ type: FOLLOW, payload: { id: userId } } as const);
export const unFollowAC = (userId: number) => ({ type: UNFOLLOW, payload: { id: userId } } as const);
export const setUsersAC = (users: any) => ({ type: SET_USERS, users } as const);

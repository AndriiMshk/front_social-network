import { UserType } from './redux-store';

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
};

type initialStateType = typeof initialState

//fix any

type actionType = followACType | unFollowACType | setUsersACType | setCurrentPageACType | setTotalUsersCountACType

export const usersReducer = (
  state: any = initialState,
  action: actionType) => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: state.users.map((user: UserType) => user.id === action.payload.id ? { ...user, followed: true } : user),
      };
    case 'UNFOLLOW':
      return {
        ...state,
        users: state.users.map((user: UserType) => user.id === action.payload.id ? { ...user, followed: false } : user),
      };
    case 'SET-USERS':
      return { ...state, users: action.payload };
    case 'SET-CURRENT-PAGE':
      return { ...state, currentPage: action.payload.page };
    case 'SET-TOTAL-USERS-COUNT':
      return { ...state, totalUsersCount: action.payload.totalUsersCount };
    default:
      return state;
  }
};

type followACType = ReturnType<typeof followAC>
type unFollowACType = ReturnType<typeof unFollowAC>
type setUsersACType = ReturnType<typeof setUsersAC>
type setCurrentPageACType = ReturnType<typeof setCurrentPageAC>
type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>

export const followAC = (userId: number) => ({ type: 'FOLLOW', payload: { id: userId } } as const);
export const unFollowAC = (userId: number) => ({ type: 'UNFOLLOW', payload: { id: userId } } as const);
export const setUsersAC = (users: UserType[]) => ({ type: 'SET-USERS', payload: users } as const);
export const setCurrentPageAC = (page: number) => ({ type: 'SET-CURRENT-PAGE', payload: { page } } as const);
export const setTotalUsersCountAC = (usersCount: number) => ({
  type: 'SET-TOTAL-USERS-COUNT',
  payload: { totalUsersCount: usersCount },
} as const);

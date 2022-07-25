import { Dispatch } from 'redux';
import { ResponseTypeAPI, usersAPI } from '../api/api';
import axios, { AxiosResponse } from 'axios';
import { DispatchType } from './store';


const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

export const usersReducer = (
  state: initialStateType = initialState,
  action: actionType): initialStateType => {
  switch (action.type) {
    case 'user/TOGGLE-FOLLOW':
      return {
        ...state,
        users: state.users.map((user: UserType) => user.id === action.payload.id
          ? { ...user, followed: action.payload.isFollowed }
          : user),
      };
    case 'user/SET-USERS':
      return { ...state, users: action.payload };
    case 'user/SET-CURRENT-PAGE':
      return { ...state, currentPage: action.payload.page };
    case 'user/SET-TOTAL-USERS-COUNT':
      return { ...state, totalUsersCount: action.payload.totalUsersCount };
    case 'user/TOGGLE-IS-FETCHING':
      return { ...state, isFetching: action.payload.isFetching };
    case 'user/FOLLOWING-IN-PROGRESS':
      return {
        ...state,
        followingInProgress: action.payload.inProgress
          ? [...state.followingInProgress, action.payload.userId]
          : state.followingInProgress.filter((id: number) => id !== action.payload.userId),
      };
    default:
      return state;
  }
};

export const toggleFollowAC = (userId: number, isFollowed: boolean) => ({
  type: 'user/TOGGLE-FOLLOW',
  payload: { id: userId, isFollowed },
} as const);
export const setUsersAC = (users: UserType[]) => ({ type: 'user/SET-USERS', payload: users } as const);
export const setCurrentPageAC = (page: number) => ({ type: 'user/SET-CURRENT-PAGE', payload: { page } } as const);
export const setTotalUsersCountAC = (usersCount: number) => ({
  type: 'user/SET-TOTAL-USERS-COUNT',
  payload: { totalUsersCount: usersCount },
} as const);
export const toggleIsFetchingAC = (isFetching: boolean) => ({
  type: 'user/TOGGLE-IS-FETCHING',
  payload: { isFetching },
} as const);
export const followingInProgressAC = (userId: number, inProgress: boolean) => ({
  type: 'user/FOLLOWING-IN-PROGRESS',
  payload: { userId: userId, inProgress: inProgress },
} as const);

export const getUsersTC = (currentPage: number, pageSize: number) => async(dispatch: DispatchType) => {
  dispatch(toggleIsFetchingAC(true));
  dispatch(setCurrentPageAC(currentPage));
  try {
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsersAC(data.items));
    dispatch(setTotalUsersCountAC(data.totalCount));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
  dispatch(toggleIsFetchingAC(false));
};

const toggleIsFollow = async(userId: number, isFollow: boolean, dispatch: DispatchType,
  method: Promise<ResponseTypeAPI>) => {
  dispatch(followingInProgressAC(userId, true));
  try {
    const data = await method;
    if (data.resultCode === 0) {
      dispatch(toggleFollowAC(userId, isFollow));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
  dispatch(followingInProgressAC(userId, false));
};

export const unFollowTC = (userId: number) => (dispatch: Dispatch) => {
  toggleIsFollow(userId, false, dispatch, usersAPI.unFollowDeleteRequest(userId));
};

export const followTC = (userId: number) => (dispatch: Dispatch) => {
  toggleIsFollow(userId, true, dispatch, usersAPI.followPostRequest(userId));
};

export type UserType = {
  name: string
  id: number
  uniqueUrlName: string
  photos: {
    small: string
    large: string
  },
  status: string
  followed: boolean
}

type initialStateType = {
  users: UserType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: number[]
}

type setUsersACType = ReturnType<typeof setUsersAC>
type setCurrentPageACType = ReturnType<typeof setCurrentPageAC>
type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>
type toggleIsFetchingACType = ReturnType<typeof toggleIsFetchingAC>
type followingInProgressACType = ReturnType<typeof followingInProgressAC>
type toggleFollowACACType = ReturnType<typeof toggleFollowAC>

type actionType =
  | setUsersACType
  | setCurrentPageACType
  | setTotalUsersCountACType
  | toggleIsFetchingACType
  | followingInProgressACType
  | toggleFollowACACType



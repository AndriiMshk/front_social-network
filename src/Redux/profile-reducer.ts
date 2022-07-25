import { ProfileType } from '../components/Profile/ProfileContainer';
import { profileAPI } from '../api/api';
import { DispatchType } from './store';
import axios from 'axios';

const initialState = {
  postsData: [
    { id: 1, message: 'hello', likeCounts: 0 },
    { id: 2, message: 'hello', likeCounts: 0 },
    { id: 3, message: 'hello', likeCounts: 0 },
  ],
  profile: null,
  status: '',
};

export const profileReducer = (state: initialStateType = initialState, action: actionType): initialStateType => {
  switch (action.type) {
    case 'profile/ADD-POST':
      return {
        ...state,
        postsData: [
          ...state.postsData,
          { id: state.postsData.length + 1, message: action.post, likeCounts: 0 },
        ],
      };
    case 'profile/SET_USER_PROFILE':
      return { ...state, profile: action.payload };
    case 'profile/SET-STATUS':
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export const addPostAC = (post: string) => ({ type: 'profile/ADD-POST', post } as const);
export const setUserProfileAC = (profile: ProfileType) => ({
  type: 'profile/SET_USER_PROFILE',
  payload: profile,
} as const);
export const setStatusAC = (status: string) => ({ type: 'profile/SET-STATUS', status: status } as const);

export const setUserProfileTC = (userId: number) => async(dispatch: DispatchType) => {
  try {
    const res = await profileAPI.getProfile(userId);
    dispatch(setUserProfileAC(res.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
};

export const setStatusTC = (userId: number) => async(dispatch: DispatchType) => {
  try {
    const res = await profileAPI.getStatus(userId);
    dispatch(setStatusAC(res.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
};

export const updateStatusTC = (status: string) => async(dispatch: DispatchType) => {
  try {
    const res = await profileAPI.updateStatus(status);
    if (res.data.resultCode === 0) {
      dispatch(setStatusAC(status));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
};

type initialStateType = {
  postsData: { id: number, message: string, likeCounts: number }[]
  profile: ProfileType | null
  status: string
}

type addPostACType = ReturnType<typeof addPostAC>
type setUserProfileType = ReturnType<typeof setUserProfileAC>
type setStatusACType = ReturnType<typeof setStatusAC>

type actionType =
  | addPostACType
  | setUserProfileType
  | setStatusACType
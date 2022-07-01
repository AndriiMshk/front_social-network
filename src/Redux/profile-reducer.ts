import { ProfileType } from '../components/Profile/ProfileContainer';
import { Dispatch } from 'redux';
import { profileAPI } from '../api/api';

const initialState = {
  postsData: [
    { id: 1, message: 'hello', likeCounts: 0 },
    { id: 2, message: 'hello', likeCounts: 0 },
    { id: 3, message: 'hello', likeCounts: 0 },
  ],
  profile: null,
  status: '',
};

type initialStateType = {
  postsData: { id: number, message: string, likeCounts: number }[]
  profile: ProfileType | null
  status: string
}

type actionType =
  addPostACType
  | setUserProfileType
  | setStatusACType

export const profileReducer = (state: initialStateType = initialState, action: actionType): initialStateType => {
  switch (action.type) {
    case 'ADD-POST':
      return {
        ...state,
        postsData: [
          ...state.postsData,
          { id: state.postsData.length + 1, message: action.post, likeCounts: 0 },
        ]
      };
    case 'SET_USER_PROFILE':
      return { ...state, profile: action.payload };
    case 'SET-STATUS':
      return { ...state, status: action.status };
    default:
      return state;
  }
};

type addPostACType = ReturnType<typeof addPostAC>
type setUserProfileType = ReturnType<typeof setUserProfileAC>
type setStatusACType = ReturnType<typeof setStatusAC>

export const addPostAC = (post: string) => ({ type: 'ADD-POST', post } as const);
export const setUserProfileAC = (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', payload: profile } as const);
export const setStatusAC = (status: string) => ({ type: 'SET-STATUS', status: status } as const);

export const setUserProfileTC = (userId: number) => {
  return (dispatch: Dispatch) => {
    profileAPI.getProfile(userId)
      .then((response) => {
        dispatch(setUserProfileAC(response.data));
      });
  };
};

export const setStatusTC = (userId: number) => {
  return (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
      .then((res) => {
        dispatch(setStatusAC(res.data));
      });
  };
};

export const updateStatusTC = (status: string) => {
  return (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
      .then((res) => {
        if (res.data.resultCode === 0)
        dispatch(setStatusAC(status));
      });
  };
}
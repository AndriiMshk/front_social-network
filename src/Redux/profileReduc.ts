import { ProfileType } from '../components/Profile/ProfileContainer';
import { Dispatch } from 'redux';
import { profileAPI } from '../api/api';

const initialState = {
  postsData: [
    { id: 1, message: 'hello', likeCounts: 0 },
    { id: 2, message: 'hello', likeCounts: 0 },
    { id: 3, message: 'hello', likeCounts: 0 },
  ],
  newPostText: '',
  profile: null,
  status: '',
};

type initialStateType = {
  postsData: { id: number, message: string, likeCounts: number }[]
  newPostText: string
  profile: ProfileType | null
  status: string
}

type actionType =
  addPostACType
  | onPostChangeACType
  | setUserProfileType
  | setStatusACType
  // | updateStatusACType

export const profileReducer = (state: initialStateType = initialState, action: actionType): initialStateType => {
  switch (action.type) {
    case 'ADD-POST':
      return {
        ...state,
        postsData: [
          ...state.postsData,
          { id: state.postsData.length + 1, message: state.newPostText, likeCounts: 0 },
        ],
        newPostText: '',
      };
    case 'UPDATE-NEW-POST-TEXT':
      return { ...state, newPostText: action.newText };
    case 'SET_USER_PROFILE':
      return { ...state, profile: action.payload };
    case 'SET-STATUS':
      return { ...state, status: action.status };
    default:
      return state;
  }
};

type addPostACType = ReturnType<typeof addPostAC>
type onPostChangeACType = ReturnType<typeof onPostChangeAC>

type setUserProfileType = ReturnType<typeof setUserProfileAC>

type setStatusACType = ReturnType<typeof setStatusAC>
// type updateStatusACType = ReturnType<typeof updateStatusAC>

export const addPostAC = () => ({ type: 'ADD-POST' } as const);
export const onPostChangeAC = (text: string) => ({ type: 'UPDATE-NEW-POST-TEXT', newText: text } as const);
export const setUserProfileAC = (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', payload: profile } as const);
export const setStatusAC = (status: string) => ({ type: 'SET-STATUS', status: status } as const);
// export const updateStatusAC = (status: string) => ({ type: 'UPDATE-STATUS', status: status } as const);

export const setUserProfileTC = (userId: number) => {
  return (dispatch: Dispatch) => {
    profileAPI.getProfile(userId)
      .then((response) => {
        dispatch(setUserProfileAC(response.data));
        // console.log(response.data);
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
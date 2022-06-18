import { ProfileType } from '../components/Profile/ProfileContainer';
import { Dispatch } from 'redux';
import axios from 'axios';

const initialState = {
  postsData: [
    { id: 1, message: 'hello', likeCounts: 0 },
    { id: 2, message: 'hello', likeCounts: 0 },
    { id: 3, message: 'hello', likeCounts: 0 },
  ],
  newPostText: '',
  profile: null,
};

type initialStateType = {
  postsData: { id: number, message: string, likeCounts: number }[]
  newPostText: string
  profile: ProfileType | null
}

type actionType =
  addPostACType
  | onPostChangeACType
  | setUserProfileType

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
    default:
      return state;
  }
};

type addPostACType = ReturnType<typeof addPostAC>
type onPostChangeACType = ReturnType<typeof onPostChangeAC>

type setUserProfileType = ReturnType<typeof setUserProfileAC>

export const addPostAC = () => ({ type: 'ADD-POST' } as const);
export const onPostChangeAC = (text: string) => ({ type: 'UPDATE-NEW-POST-TEXT', newText: text } as const);
export const setUserProfileAC = (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', payload: profile } as const);

export const setUserProfileTC = (userId: string) => {
  return (dispatch: Dispatch) => {
    if (!userId) {userId = '2';}
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then((response) => {
        dispatch(setUserProfileAC(response.data));
      });
  }
}
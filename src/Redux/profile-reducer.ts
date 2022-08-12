import { ProfileType } from '../components/Profile/ProfileContainer';
import { profileAPI } from '../api/api';
import { DispatchType, RootStateType } from './store';
import axios from 'axios';
import { setErrorAC } from './app-reducer';

const initialState = {
  postsData: [
    { id: 1, message: 'hello', likeCounts: 0 },
    { id: 2, message: 'hello', likeCounts: 0 },
    { id: 3, message: 'hello', likeCounts: 0 },
  ],
  profile: null,
  status: '',
};

export const profileReducer = (state: initialStateType = initialState, action: actionType): any => {
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
    case 'profile/SET-PHOTO':
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    case 'profile/UPDATE-USER-ABOUT':
      return { ...state, profile: { ...state.profile, [action.payload.contact]: action.payload.value } };
    case 'profile/UPDATE-USER-CONTACTS':
      return {
        ...state,
        profile: {
          ...state.profile,
          contacts: { ...state.profile?.contacts, [action.payload.contact]: action.payload.value },
        },
      };
    default:
      return state;
  }
};

export const addPostAC = (post: string) => ({ type: 'profile/ADD-POST', post } as const);
export const setUserProfileAC = (profile: ProfileType) => ({
  type: 'profile/SET_USER_PROFILE',
  payload: profile,
} as const);
export const setStatusAC = (status: string) => ({ type: 'profile/SET-STATUS', status } as const);
export const setPhotoAC = (photos: any) => ({ type: 'profile/SET-PHOTO', photos } as const);
export const updateUserAboutAC = (contact: string, value: string | boolean) => ({
  type: 'profile/UPDATE-USER-ABOUT',
  payload: { contact, value },
} as const);
export const updateUserContactsAC = (contact: string, value: string) => ({
  type: 'profile/UPDATE-USER-CONTACTS',
  payload: { contact, value },
} as const);

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

export const setPhotoTC = (file: FileList | null) => async(dispatch: DispatchType) => {
  try {
    const res = await profileAPI.setPhoto(file);
    if (res.data.resultCode === 0) {
      dispatch(setPhotoAC(res.data.data.photos));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
};

export const updateProfileContactsTC = (contact: string, value: string) =>
  async(dispatch: DispatchType, getState: () => RootStateType) => {
    const currentProfile = getState().profile.profile;
    try {
      const res = await profileAPI.updateProfile(
        {
          ...currentProfile,
          contacts: { ...currentProfile.contacts, [contact]: value },
        });
      if (res.data.resultCode === 0) {
        dispatch(updateUserContactsAC(contact, value));
        dispatch(setErrorAC(''))
      }
      else {
        dispatch(setErrorAC(res.data.messages[0]))
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.warn(error.message);
      }
    }
  };

export const updateProfileAboutTC = (contact: string, value: any) =>
  async(dispatch: DispatchType, getState: () => RootStateType) => {
    const currentProfile = getState().profile.profile;
    try {
      await profileAPI.updateProfile({ ...currentProfile, [contact]: value });
      dispatch(updateUserAboutAC(contact, value));
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
type setPhotoACType = ReturnType<typeof setPhotoAC>
type updateUserAboutACType = ReturnType<typeof updateUserAboutAC>
type updateUserContactsACType = ReturnType<typeof updateUserContactsAC>

type actionType =
  | addPostACType
  | setUserProfileType
  | setStatusACType
  | setPhotoACType
  | updateUserAboutACType
  | updateUserContactsACType
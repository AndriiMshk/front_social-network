import { ProfileStateType } from './store';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const initialState: any = {
  postsData: [
    { id: 1, message: 'hello', likeCounts: 0 },
    { id: 2, message: 'hello', likeCounts: 0 },
    { id: 3, message: 'hello', likeCounts: 0 },
  ],
  newPostText: '',
  profile: null
};

type actionType =
  addPostACType
  | onPostChangeACType
  | setUserProfileType

export const profileReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postsData: [
          ...state.postsData,
          { id: state.postsData.length + 1, message: state.newPostText, likeCounts: 0 },
        ],
        newPostText: '',
      };
    case UPDATE_NEW_POST_TEXT:
      return { ...state, newPostText: action.newText };
    case 'SET_USER_PROFILE':
      return {...state, profile: action.payload}
    default:
      return state;
  }
};

type addPostACType = ReturnType<typeof addPostAC>
type onPostChangeACType = ReturnType<typeof onPostChangeAC>

type setUserProfileType = ReturnType<typeof setUserProfile>

export const addPostAC = () => ({ type: ADD_POST } as const);
export const onPostChangeAC = (text: string) => ({ type: UPDATE_NEW_POST_TEXT, newText: text } as const);

export const setUserProfile = (profile: any) => ({type: 'SET_USER_PROFILE', payload: profile} as const)

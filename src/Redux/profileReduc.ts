import { ProfileStateType } from './state';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export const profileReducer = (state: ProfileStateType, action: any) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = { id: 6, message: state.newPostText, likeCounts: 0 };
      state.postsData.push(newPost);
      state.newPostText = '';
      return state;
    case UPDATE_NEW_POST_TEXT:
      if (action.newText || action.newText !== '') { // поменял на !==
        state.newPostText = action.newText;
      }
      return state;
    default:
      return state;
  }
};

export const addPostAC = () => ({ type: ADD_POST });
export const onPostChangeAC = (text: string | undefined) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });

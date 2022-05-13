import { MessageStateType } from './state';

const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

export const messageReducer = (state: MessageStateType, action: any) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newMessage = { id: 6, message: state.newMessageBody };
      state.messagesData.push(newMessage);
      state.newMessageBody = '';
      return state;
    case UPDATE_NEW_MESSAGE_TEXT:
      if (action.newText || action.newText !== '') { // поменял на !==
        state.newMessageBody = action.newText;
      }
      return state;
    default:
      return state;
  }
};

export const addMessageAC = () => ({ type: ADD_MESSAGE });
export const onMessageChangeAC = (text: string | undefined) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text });
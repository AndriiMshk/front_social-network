import { MessageStateType } from './store';

const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

const initialState: MessageStateType = {
  messagesData: [
    { id: 1, message: 'message1' },
    { id: 2, message: 'message2' },
    { id: 3, message: 'message3' },
    { id: 4, message: 'message4' },
  ],
  newMessageBody: '',
  dialogsData: [
    { id: 1, name: 'name1' },
    { id: 2, name: 'name2' },
    { id: 3, name: 'name3' },
    { id: 4, name: 'name4' },
  ],
}

export const messageReducer = (state = initialState, action: any) => {
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
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
};

type ActionType = addMessageACType | onMessageChangeACType

export const messageReducer = (state: MessageStateType = initialState, action: ActionType): MessageStateType => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          {
            id: state.messagesData.length + 1,
            message: state.newMessageBody,
          },
        ],
        newMessageBody: '',
      };
    case UPDATE_NEW_MESSAGE_TEXT:
      return { ...state, newMessageBody: action.newText };
    default:
      return state;
  }
};

type addMessageACType = ReturnType<typeof addMessageAC>
type onMessageChangeACType = ReturnType<typeof onMessageChangeAC>

export const addMessageAC = () => ({ type: ADD_MESSAGE } as const);
export const onMessageChangeAC = (text: string) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text } as const);
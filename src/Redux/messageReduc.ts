import { DialogItemPropsType, MessageItemPropsType } from './store';

const ADD_MESSAGE = 'ADD-MESSAGE';

export type MessageStateType = {
  messagesData: MessageItemPropsType[]
  dialogsData: DialogItemPropsType[]
}

const initialState: MessageStateType = {
  messagesData: [
    { id: 1, message: 'message1' },
    { id: 2, message: 'message2' },
    { id: 3, message: 'message3' },
    { id: 4, message: 'message4' },
  ],
  dialogsData: [
    { id: 1, name: 'name1' },
    { id: 2, name: 'name2' },
    { id: 3, name: 'name3' },
    { id: 4, name: 'name4' },
  ],
};

type ActionType = addMessageACType

export const messageReducer = (state: MessageStateType = initialState, action: ActionType): MessageStateType => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          {
            id: state.messagesData.length + 1,
            message: action.message,
          },
        ],
      };
    default:
      return state;
  }
};

type addMessageACType = ReturnType<typeof addMessageAC>

export const addMessageAC = (message: string) => ({ type: ADD_MESSAGE, message } as const);

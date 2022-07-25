const initialState = {
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

export const messageReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case 'message/ADD-MESSAGE':
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

export const addMessageAC = (message: string) => ({ type: 'message/ADD-MESSAGE', message } as const);

type InitialStateType = typeof initialState
type ActionType = addMessageACType
type addMessageACType = ReturnType<typeof addMessageAC>
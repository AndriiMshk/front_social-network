export type PostPropsType = {
  id?: number
  message: string
  likeCounts: number
}
export type DialogItemPropsType = {
  id: string | number
  name: string
}
export type ProfileStateType = {
  postsData: PostPropsType[]
  newPostText: string
}
export type MessageItemPropsType = {
  id: string | number
  message: string
}
export type MessageStateType = {
  messagesData: MessageItemPropsType[]
  newMessageBody: string
  dialogsData: DialogItemPropsType[]
}
export type friendsType = {
  id: number
  name: string
  ava: string
}
export type sidebarStateType = {
  friends: friendsType[]
}
export type stateType = {
  sidebar: sidebarStateType
  profile: ProfileStateType
  dialogs: MessageStateType
}

export type storeType = {
  _state: stateType

  _callSubscriber: (state: stateType) => void

  getState: () => stateType
  subscribe: (observer: (state: stateType) => void) => void

  dispatch: (action: any) => void

}

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

export const store: storeType = {
  _state: {
    sidebar: {
      friends: [
        {
          id: 1,
          name: 'bestFriend1',
          ava: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/800px-Mercedes-Logo.svg.png',
        },
        {
          id: 2,
          name: 'bestFriend2',
          ava: 'https://upload.wikimedia.org/wikipedia/ru/thumb/7/74/Volvo_Logo.svg/1200px-Volvo_Logo.svg.png',
        },
        {
          id: 3,
          name: 'bestFriend3',
          ava: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/ba/Lancia_Logo.svg/1200px-Lancia_Logo.svg.png',
        },
      ],
    },
    profile: {
      postsData: [
        { id: 1, message: 'hello', likeCounts: 0 },
        { id: 2, message: 'hello', likeCounts: 0 },
        { id: 3, message: 'hello', likeCounts: 0 },
      ],
      newPostText: '',
    },
    dialogs: {
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
    },
  },

  _callSubscriber(state: stateType) {
    console.log('state_changed');
  },

  getState() {
    return this._state;
  },
  subscribe(observer: (state: stateType) => void) {
    this._callSubscriber = observer;
  },

  dispatch(action: any) {
    if (action.type === ADD_POST) {
      let newPost = { id: 6, message: this._state.profile.newPostText, likeCounts: 0 };
      this._state.profile.postsData.push(newPost);
      this._state.profile.newPostText = '';
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      if (action.newText || action.newText !== '') { // поменял на !==
        this._state.profile.newPostText = action.newText;
      }
      this._callSubscriber(this._state);
    } else if (action.type === ADD_MESSAGE) {
      let newMessage = { id: 6, message: this._state.dialogs.newMessageBody };
      this._state.dialogs.messagesData.push(newMessage);
      this._state.dialogs.newMessageBody = '';
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
      if (action.newText || action.newText !== '') { // поменял на !==
        this._state.dialogs.newMessageBody = action.newText;
      }
      this._callSubscriber(this._state);
    }
  },
};

export const addPostAC = () => ({ type: ADD_POST });
export const onPostChangeAC = (text: string | undefined) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });
export const addMessageAC = () => ({ type: ADD_MESSAGE });
export const onMessageChangeAC = (text: string | undefined) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text });


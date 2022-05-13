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
  newMessage: string
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

  _callSubscriber: any

  getState: any
  subscribe: any

  dispatch: any

}

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
      newMessage: '',
      dialogsData: [
        { id: 1, name: 'name1' },
        { id: 2, name: 'name2' },
        { id: 3, name: 'name3' },
        { id: 4, name: 'name4' },
      ],
    },
  },

  _callSubscriber(state: any) {
    console.log('state_changed');
  },

  getState() {
    return this._state;
  },
  subscribe(observer: (state: stateType) => void) {
    this._callSubscriber = observer;
  },

  dispatch(action: any) {
    if (action.type === 'ADD-POST') {
      let newPost = { id: 5, message: this._state.profile.newPostText, likeCounts: 0 };
      this._state.profile.postsData.push(newPost);
      this._state.profile.newPostText = '';
      this._callSubscriber(this._state);
    } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
      if (action.newText || action.newText === '') {
        this._state.profile.newPostText = action.newText;
      }
      this._callSubscriber(this._state);
    } else if (action.type === 'ADD-MESSAGE') {
      let newMessage = { id: 5, message: this._state.dialogs.newMessage };
      this._state.dialogs.messagesData.push(newMessage);
      this._state.dialogs.newMessage = '';
      this._callSubscriber(this._state);
    } else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
      if (action.newText || action.newText === '') {
        this._state.dialogs.newMessage = action.newText;
      }
      this._callSubscriber(this._state);
    }
  },
};


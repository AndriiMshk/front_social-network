export const temp_store = {
  _state: {},
  _callSubscriber(state: any) {
    console.log('state_changed');
  },
  getState() {
    return this._state;
  },
  subscribe(observer: any) {
    this._callSubscriber = observer;
  },
  dispatch(action: any) {
    // this._state.sidebar = sidebarReducer(this._state.sidebar, action)
    // this._state.profile = profileReducer(this._state.profile, action)
    // this._state.dialogs = messageReducer(this._state.dialogs, action)
    this._callSubscriber(this._state);
  },
};



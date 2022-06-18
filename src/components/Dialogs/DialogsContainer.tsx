import React from 'react';
import { Dialogs } from './Dialogs';
import { addMessageAC, onMessageChangeAC } from '../../Redux/messageReduc';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StateTypeFromRedux } from '../../Redux/redux-store';

const mapStateToProps = (state: StateTypeFromRedux) => {
  return {
    dialogs: state.dialogs,
    isAuth: state.auth.isAuth
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addMessage: () => {dispatch(addMessageAC());},
    onMessageChange: (newText: string) => {dispatch(onMessageChangeAC(newText));},
  };
};

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
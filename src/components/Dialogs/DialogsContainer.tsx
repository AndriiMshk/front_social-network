import React from 'react';
import { MessageStateType } from '../../Redux/store';
import { Dialogs } from './Dialogs';
import { addMessageAC, onMessageChangeAC } from '../../Redux/messageReduc';
import { connect } from 'react-redux';
import { store } from '../../Redux/redux-store';

const mapStateToProps = (state: any) => {
  return {
    dialogs: state
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addMessage: () => {dispatch(addMessageAC());},
    onMessageChange: (newText: string) => {dispatch(onMessageChangeAC(newText));}
  }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
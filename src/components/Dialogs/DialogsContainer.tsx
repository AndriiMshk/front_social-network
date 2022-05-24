import React from 'react';
import { stateType } from '../../Redux/store';
import { Dialogs } from './Dialogs';
import { addMessageAC, onMessageChangeAC } from '../../Redux/messageReduc';
import { connect } from 'react-redux';

const mapStateToProps = (state: stateType) => {
  return {
    dialogs: state.dialogs,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addMessage: () => {dispatch(addMessageAC());},
    onMessageChange: (newText: string) => {dispatch(onMessageChangeAC(newText));},
  };
};

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
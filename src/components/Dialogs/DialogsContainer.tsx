import React from 'react';
import { Dialogs, DialogsPropsType } from './Dialogs';
import { addMessageAC } from '../../Redux/message-reducer';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { DialogsFromReduxType, StateTypeFromRedux } from '../../Redux/redux-store';
import { withAuthRedirectHOC } from '../../HOC/AuthRedirectHOC';

type mapStateToPropsType = {
  dialogs: DialogsFromReduxType
}

type maDispatchToPropsType = {
  addMessage: (message: string) => void,
}

type DialogsContainerPropsType = mapStateToPropsType & maDispatchToPropsType

class DialogsContainer extends React.Component<DialogsContainerPropsType, DialogsPropsType> {
  render() {
    return <Dialogs {...this.props as DialogsPropsType} />;
  }
}

const mapStateToProps = (state: StateTypeFromRedux): mapStateToPropsType => {
  return {
    dialogs: state.dialogs,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): maDispatchToPropsType => {
  return {
    addMessage: (message: string) => dispatch(addMessageAC(message))
  };
};

export default compose<React.ComponentType>(
  withAuthRedirectHOC,
  connect(mapStateToProps, mapDispatchToProps),
)(DialogsContainer);

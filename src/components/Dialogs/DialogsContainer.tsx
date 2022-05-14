import React from 'react';
// @ts-ignore
import style from './Dialogs.module.css';
import { MessageItem } from './Massage/Message';
import { DialogItem } from './DialogItem/Dialog';
import { DialogItemPropsType, MessageStateType, storeType } from '../../Redux/store';
import { MessageItemPropsType } from '../../Redux/store';
import { AddMessage } from './AddMassage';
import { Dialogs } from './Dialogs';
import { addMessageAC, onMessageChangeAC } from '../../Redux/messageReduc';

type DialogsContainerPropsType = {
  store: storeType
}

export const DialogsContainer: React.FC<DialogsContainerPropsType> = (props) => {

  const state = props.store.getState()

  const addMessage = () => {
    props.store.dispatch(addMessageAC());
  };

  const onMessageChange = (newText: string) => {
    props.store.dispatch(onMessageChangeAC(newText));
  };

  return (
    <div className={style.dialogs}>
     <Dialogs
       dialogsState={state.dialogs}
       addMessage={addMessage}
       onMessageChange={onMessageChange}
     />
    </div>
  );
};
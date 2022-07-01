import React from 'react';
import style from './Dialogs.module.css';
import { MessageItem } from './Massage/Message';
import { DialogItem } from './DialogItem/Dialog';
import { DialogItemPropsType, MessageItemPropsType, MessageStateType } from '../../Redux/store';
import { AddMessage } from './AddMassage';

export type DialogsPropsType = {
  dialogs: MessageStateType
  addMessage: (message: string) => void
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

  return (
    <div className={style.dialogs}>
      <div className={style.dialogsItems}>
        Names
        {props.dialogs.dialogsData.map((d: DialogItemPropsType) => (
          <DialogItem
            key={d.id}
            name={d.name}
            id={d.id}
          />),
        )}
      </div>
      <div className={style.messages}>
        Massages
        {props.dialogs.messagesData.map((m: MessageItemPropsType) => (
          <MessageItem
            key={m.id}
            message={m.message}
          />),
        )}
        <AddMessage
          addMessage={props.addMessage}
        />
      </div>

    </div>
  );
};
import React from 'react';
import style from './Dialogs.module.css';
import { MessageItem } from './Massage/Message';
import { DialogItem } from './DialogItem/Dialog';
import { DialogItemPropsType, MessageStateType, storeType } from '../../Redux/store';
import { MessageItemPropsType } from '../../Redux/store';
import { AddMessage } from './AddMassage';

type DialogsPropsType = {
  // store: storeType
  dialogsState: MessageStateType
  // dispatch: (action: any) => void
  // 1
  // 2
}

export const Dialogs: React.FC<any> = (props) => {
  return (
    <div className={style.dialogs}>
      <div className={style.dialogsItems}>
        Names
        {props.dialogsState.dialogsData.map((d: DialogItemPropsType, key: number) => (
          <DialogItem
            key={key}
            name={d.name}
            id={d.id}
          />),
        )}
      </div>
      <div className={style.messages}>
        Massages
        {props.dialogsState.messagesData.map((m: MessageItemPropsType, key: number) => (
          <MessageItem
            key={key}
            message={m.message}
          />),
        )}
        <AddMessage
          newMessage={props.dialogsState.newMessageBody}
          addMessage={props.addMessage}
          onMessageChange={props.onMessageChange}
        />
      </div>

    </div>
  );
};
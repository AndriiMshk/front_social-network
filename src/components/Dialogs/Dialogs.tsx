import React from 'react';
import style from './Dialogs.module.css';
import {MessageItem} from "./Massage/Message";
import {DialogItem} from "./DialogItem/Dialog";
import {DialogItemPropsType} from "../../index";
import {MessageItemPropsType} from "../../index";

type DialogsPropsType = {
    dialogsData: DialogItemPropsType[]
    messagesData: MessageItemPropsType[]
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                Names
                {props.dialogsData.map((d: DialogItemPropsType, key: number) => (
                    <DialogItem
                        key={key}
                        name={d.name}
                        id={d.id}
                    />)
                )}
            </div>
            <div className={style.messages}>
                Massages
                {props.messagesData.map((m: MessageItemPropsType, key: number) => (
                    <MessageItem
                        key={key}
                        message={m.message}
                    />)
                )}
            </div>
        </div>
    )
}
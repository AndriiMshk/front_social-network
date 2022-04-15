import React from 'react';
import s from './Dialogs.module.css';
import {MessageItem} from "./Massage/Message";
import {DialogItem} from "./DialogItem/Dialog";
import {DialogItemPropsType} from "../../index";
import {MessageItemPropsType} from "../../index";

export const Dialogs: React.FC<any> = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                Names
                {props.dialogsData.map((d: DialogItemPropsType, key: number) => (
                    <DialogItem
                        key={key}
                        name={d.name}
                        id={d.id}
                    />)
                )}
            </div>
            <div className={s.messages}>
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
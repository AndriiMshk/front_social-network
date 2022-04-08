import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

type DialogItemPropsType = {
    name: string
    id: string
}

const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={s.item}>
            <NavLink to={path} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    )
}

type MessageItemPropsType = {
    message: string
}

const MessageItem: React.FC<MessageItemPropsType> = (props) => {
    return (
        <div className={s.message}>massage1</div>
    )
}

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                Names
                <DialogItem
                    name={'name1'}
                    id='1'
                />
                <DialogItem
                    name={'name2'}
                    id='2'
                />
                <DialogItem
                    name={'name3'}
                    id='3'
                />
                <DialogItem
                    name={'name4'}
                    id='4'
                />
                <DialogItem
                    name={'name5'}
                    id='5'
                />

            </div>
            <div className={s.messages}>
                Massages
                <MessageItem
                    message={'Message1'}
                />
                <MessageItem
                    message={'Message2'}
                />
                <MessageItem
                    message={'Message3'}
                />
                <MessageItem
                    message={'Message4'}
                />
                <MessageItem
                    message={'Message5'}
                />
            </div>
        </div>

    )
}

export default Dialogs;
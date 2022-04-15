import React from 'react';
import s from './Message.module.css';

type MessageItemPropsType = {
    message: string
}

export const MessageItem: React.FC<MessageItemPropsType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

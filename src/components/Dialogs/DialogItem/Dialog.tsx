import React from 'react';
import s from './Dialog.module.css';
import {NavLink} from "react-router-dom";
import {DialogItemPropsType} from "../../../index";


export const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={s.item}>
            <NavLink to={path} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    )
}
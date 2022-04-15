import React from 'react';
import style from './Dialog.module.css';
import {NavLink} from "react-router-dom";
import {DialogItemPropsType} from "../../../index";


export const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={style.item}>
            <NavLink to={path} activeClassName={style.active}>{props.name}</NavLink>
        </div>
    )
}
import React from 'react';
import s from './Post.module.css';

type PostPropsType = {
    id ?: number
    message: string
    likeCounts: number
}

export const Post: React.FC<PostPropsType> = (props) => {
    return (
        <div className={s.item}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/1200px-BMW_logo_%28gray%29.svg.png"
                alt=""/>
            {props.message}
            <div>
                <button>Like</button>
                <span>{props.likeCounts}</span>
            </div>
        </div>
    )
}
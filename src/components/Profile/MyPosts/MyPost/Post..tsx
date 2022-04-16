import React, {useState} from 'react';
import s from './Post.module.css';

type PostPropsType = {
    id ?: number
    message: string
    likeCounts: number
}

export const Post: React.FC<PostPropsType> = (props) => {

    let [like, setLike] = useState(props.likeCounts)

    const addLike = () => {
        setLike(like+1)
    }

    const resetLikes = () => {
        setLike(0)
    }

    return (
        <div className={s.item}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/1200px-BMW_logo_%28gray%29.svg.png"
                alt=""/>
            {props.message}
            <div>
                <button onClick={addLike}>Like</button>
                <button onClick={resetLikes}>reset</button>
                <span>{like}</span>
                <span>{props.likeCounts}</span>
            </div>
        </div>
    )
}
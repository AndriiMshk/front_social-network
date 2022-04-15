import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./MyPost/Post.";
import {PostPropsType} from "../../../index";

const postsData = [
    {id: 1, message: 'hello', likeCounts: 14},
    {id: 2, message: 'hello', likeCounts: 24},
    {id: 3, message: 'hello', likeCounts: 34}
]

export const MyPosts: React.FC<any> = (props) => {
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea/>
                </div>
                <div>
                    <button>add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {props.postsData.map( (p: any, key: number) => (
                    <Post
                        key={key}
                        message={p.message}
                        likeCounts={p.likeCounts}
                    />)
                )}
            </div>
        </div>
    )
}
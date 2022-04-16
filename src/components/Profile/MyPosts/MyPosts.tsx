import React from 'react';
import style from './MyPosts.module.css';
import {Post} from "./MyPost/Post.";
import {PostPropsType} from "../../../Redux/store";

type MyPostsPropsType = {
    postsData: PostPropsType[]
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea/>
                </div>
                <div>
                    <button>add post</button>
                </div>
            </div>
            <div className={style.posts}>
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
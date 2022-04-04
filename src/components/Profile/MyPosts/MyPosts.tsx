import React from 'react';
import s from './MyPosts.module.css';
import Post from "./MyPost/Post.";


const MyPosts = () => {
    return (
        <div>
            My posts
            <div>
                <textarea/>
                <button>add post</button>
            </div>
            <div className={s.posts}>
                <Post
                    message={'hello'}
                    likeCounts={15}/>
                <Post
                    message={'world'}
                    likeCounts={25}
                />
            </div>
        </div>
    )
}

export default MyPosts;
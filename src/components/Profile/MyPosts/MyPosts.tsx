import React from 'react';
import style from './MyPosts.module.css';
import { Post } from './MyPost/Post.';
import { addPostAC, onPostChangeAC } from '../../../Redux/profileReduc';
import { PostPropsType } from '../../../Redux/store';

type MyPostsPropsType = {
  postsData: PostPropsType[]
  newPostText: string
  dispatch: (action: any) => void
}

export const MyPosts: React.FC<any> = (props) => {

  let postElement = React.createRef<HTMLTextAreaElement>();

  const onPostChangeHandler = () => {
    let text = postElement.current?.value;
    props.onPostChange(text)
  };

  const addPostHandler = () => {
    props.addPost()
  };

  return (
    <div className={style.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea
            ref={postElement}
            value={props.newPostText}
            onChange={onPostChangeHandler}
          />
        </div>
        <div>
          <button
            onClick={addPostHandler}
          >add post
          </button>
        </div>
      </div>
      <div className={style.posts}>
        {props.posts.map((p: any, key: number) => (
          <Post
            key={key}
            message={p.message}
            likeCounts={p.likeCounts}
          />),
        )}
      </div>
    </div>
  );
};
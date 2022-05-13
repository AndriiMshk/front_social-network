import React from 'react';
import style from './MyPosts.module.css';
import { Post } from './MyPost/Post.';
import { addPostAC, onPostChangeAC } from '../../../Redux/profileReduc';
import { PostPropsType } from '../../../Redux/state';

type MyPostsPropsType = {
  postsData: PostPropsType[]
  newPostText: string
  dispatch: (action: any) => void
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

  let postElement = React.createRef<HTMLTextAreaElement>();

  const onPostChange = () => {
    let text = postElement.current?.value;
    props.dispatch(onPostChangeAC(text));
  };

  const addPostHandler = () => {
    props.dispatch(addPostAC());
  };

  return (
    <div className={style.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea
            ref={postElement}
            value={props.newPostText}
            onChange={onPostChange}
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
        {props.postsData.map((p: any, key: number) => (
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
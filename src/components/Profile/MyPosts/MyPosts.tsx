import React from 'react';
import style from './MyPosts.module.css';
import { Post } from './MyPost/Post.';
import { PostPropsType } from '../../../Redux/store';

type MyPostsPropsType = {
  posts: PostPropsType[]
  newPostText: string
  addPost: () => void
  onPostChange: (text: string) => void
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

  let postElement = React.createRef<HTMLTextAreaElement>();

  const onPostChangeHandler = () => {
    let text = postElement.current?.value;
    if (text) {
      props.onPostChange(text);
    }
  };

  const addPostHandler = () => {
    props.addPost();
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
        {props.posts.map((p: PostPropsType) => (
          <Post
            key={p.id}
            message={p.message}
            likeCounts={p.likeCounts}
          />),
        )}
      </div>
    </div>
  );
};
import React from 'react';
import style from './MyPosts.module.css';
import { Post } from './MyPost/Post.';
import { PostPropsType } from '../../../Redux/store';

type MyPostsPropsType = {
  postsData: PostPropsType[]
  newPostText: string
  addPost: () => void
  updateNewPostText: (newText: string | undefined) => void
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

  let postElement = React.createRef<HTMLTextAreaElement>();

  const onPostChange = () => {
    let text = postElement.current?.value;
    props.updateNewPostText(text);
  };

  const addTaskHandler = () => {
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
                      onChange={onPostChange}
                    />
        </div>
        <div>
          <button
            onClick={addTaskHandler}
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
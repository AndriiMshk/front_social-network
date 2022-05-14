import React from 'react';
import { Post } from './MyPost/Post.';
import { addPostAC, onPostChangeAC } from '../../../Redux/profileReduc';
import { PostPropsType, storeType } from '../../../Redux/store';
import { MyPosts } from './MyPosts';

type MyPostsPropsType = {
  store: storeType

  // postsData: PostPropsType[]
  // newPostText: string
  // dispatch: (action: any) => void
}

export const MyPostsContainer: React.FC<MyPostsPropsType> = (props) => {

  const state = props.store.getState()

  const onPostChange = (text: string) => {
    props.store.dispatch(onPostChangeAC(text));
  };

  const addPost = () => {
    props.store.dispatch(addPostAC());
  };

  return (<MyPosts
    posts={state.profile.postsData}
    newPostText={state.profile.newPostText}
    onPostChange={onPostChange}
    addPost={addPost}
  />);
};
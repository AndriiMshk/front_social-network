import React from 'react';
import { Post } from './MyPost/Post.';
import { addPostAC, onPostChangeAC } from '../../../Redux/profileReduc';
import { PostPropsType, ProfileStateType, storeType } from '../../../Redux/store';
import { MyPosts } from './MyPosts';
import { connect } from 'react-redux';

type MyPostsPropsType = {
  store: storeType

  // postsData: PostPropsType[]
  // newPostText: string
  // dispatch: (action: any) => void
}



const mapStateToProps = (state: any) => {
  return {
    posts: state.profile.postsData,
    newPostText: state.profile.newPostText,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addPost: () => {dispatch(addPostAC())},
    onPostChange: (text: string) => {dispatch(onPostChangeAC(text))}
  };
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
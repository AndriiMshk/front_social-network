import React from 'react';
import { addPostAC, onPostChangeAC } from '../../../Redux/profileReduc';
import { MyPosts } from './MyPosts';
import { connect } from 'react-redux';
import { stateType } from '../../../Redux/store';

const mapStateToProps = (state: stateType) => {
  return {
    posts: state.profile.postsData,
    newPostText: state.profile.newPostText,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addPost: () => {dispatch(addPostAC());},
    onPostChange: (text: string) => {dispatch(onPostChangeAC(text));},
  };
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
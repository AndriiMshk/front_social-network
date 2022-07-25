import React from 'react';
import { addPostAC } from '../../../Redux/profile-reducer';
import { MyPosts } from './MyPosts';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootStateType } from '../../../Redux/store';

const mapStateToProps = (state: RootStateType) => {
  return {
    posts: state.profile.postsData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addPost: (post: string) => {dispatch(addPostAC(post));},
  };
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
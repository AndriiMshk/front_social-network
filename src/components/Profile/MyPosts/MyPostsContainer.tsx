import React from 'react';
import { addPostAC } from '../../../Redux/profile-reducer';
import { MyPosts } from './MyPosts';
import { connect } from 'react-redux';
import { stateType } from '../../../Redux/store';
import { Dispatch } from 'redux';

const mapStateToProps = (state: stateType) => {
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
import React from 'react';
import style from './Profile.module.css';
import { MyPosts } from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { PostPropsType, ProfileStateType } from '../../Redux/store';

type ProfilePropsType = {
  profile: ProfileStateType
  addPost: () => void
  updateNewPostText: (newText: string | undefined) => void

}

export const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts
        postsData={props.profile.postsData}
        newPostText={props.profile.newPostText}
        addPost={props.addPost}
        updateNewPostText={props.updateNewPostText}
      />
    </div>
  );
};
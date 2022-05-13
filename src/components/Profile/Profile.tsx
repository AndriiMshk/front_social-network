import React from 'react';
import style from './Profile.module.css';
import { MyPosts } from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { PostPropsType, ProfileStateType } from '../../Redux/state';

type ProfilePropsType = {
  profile: ProfileStateType
  dispatch: (action: any) => void


}

export const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts
        postsData={props.profile.postsData}
        newPostText={props.profile.newPostText}
        dispatch={props.dispatch}
      />
    </div>
  );
};
import React from 'react';
import style from './Profile.module.css';
import { MyPosts } from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { PostPropsType, ProfileStateType, storeType } from '../../Redux/store';
import { MyPostsContainer } from './MyPosts/MyPostsContainer'

type ProfilePropsType = {
  store: storeType
  //profile: ProfileStateType
  //dispatch: (action: any) => void


}

export const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPostsContainer
       store={props.store}
      />
    </div>
  );
};
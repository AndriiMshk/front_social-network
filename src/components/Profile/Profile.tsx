import React from 'react';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileType } from './ProfileContainer';

export type ProfilePropsTpe = {
  profile: ProfileType | null
}

export const Profile: React.FC<ProfilePropsTpe> = (props) => {
  return (
    <div>
      <ProfileInfo profile={props.profile}/>
      <MyPostsContainer />
    </div>
  );
};
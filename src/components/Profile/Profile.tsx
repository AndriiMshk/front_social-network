import React from 'react';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileType } from './ProfileContainer';

export type ProfilePropsTpe = {
  profile: ProfileType | null
  status: string
  updateUserStatus: (status: string) => void
}

export const Profile: React.FC<ProfilePropsTpe> = (props) => {
  return (
    <div>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
      <MyPostsContainer />
    </div>
  );
};
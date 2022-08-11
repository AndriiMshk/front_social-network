import React from 'react';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileType } from './ProfileContainer';

export type ProfilePropsTpe = {
  profile: ProfileType | null
  status: string
  updateUserStatus: (status: string) => void
  idMyProfilePage: boolean
  setPhoto: any
}

export const Profile: React.FC<ProfilePropsTpe> = (props) => {


  return (
    <div>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        idMyProfilePage={props.idMyProfilePage}
        setPhoto={props.setPhoto}
      />
      <MyPostsContainer />
    </div>
  );
};
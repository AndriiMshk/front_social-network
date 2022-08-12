import React from 'react';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileType } from './ProfileContainer';

export type ProfilePropsTpe = {
  profile: ProfileType | null
  status: string
  updateUserStatus: (status: string) => void
  isMyProfilePage: boolean
  setPhoto: (file: FileList | null) => void
  updateProfileAbout: (contact: string, value: string | boolean) => void
  updateProfileContacts: (contact: string, value: string) => void
  error: string
}

export const Profile: React.FC<ProfilePropsTpe> = (props) => {
  return (
    <div>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        isMyProfilePage={props.isMyProfilePage}
        setPhoto={props.setPhoto}
        updateProfileAbout={props.updateProfileAbout}
        updateProfileContacts={props.updateProfileContacts}
        error={props.error}
      />
      <MyPostsContainer />
    </div>
  );
};
import React from 'react';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../api/api';

export const Profile: React.FC<ProfilePropsTpe> = (
  {
    status,
    isMyProfilePage,
    error,
    updateProfileAbout,
    profile,
    updateProfileContacts,
    setPhoto,
    updateUserStatus,
  }) => {
  return (
    <div>
      <ProfileInfo
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatus}
        isMyProfilePage={isMyProfilePage}
        setPhoto={setPhoto}
        updateProfileAbout={updateProfileAbout}
        updateProfileContacts={updateProfileContacts}
        error={error}
      />
      <MyPostsContainer />
    </div>
  );
};

export type ProfilePropsTpe = {
  profile: ProfileType | null
  status: string
  updateUserStatus: (status: string) => void
  isMyProfilePage: boolean
  setPhoto: (file: File | null) => void
  updateProfileAbout: (contact: string, value: string | boolean) => void
  updateProfileContacts: (contact: string, value: string) => void
  error: string
}
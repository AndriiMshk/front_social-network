import React from 'react';
import style from './ProfileInfo.module.css';
import { Preloader } from '../../common/Preloader/Preloader';
import { ProfileType } from '../ProfileContainer';
import { ProfileStatus } from './ProfileStatus';

export type ProfileInfoPropsTpe = {
  profile: ProfileType | null
}

export const ProfileInfo: React.FC<ProfileInfoPropsTpe> = ({profile}) => {
  if (!profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={style.descriptionBlock}>
        <img src={profile.photos.small} alt="" />
        <ProfileStatus status={'11111'}/>
        <hr />
        <span>{profile.fullName}</span>
        <p>{profile.aboutMe}</p>
        <span>facebook: {profile.contacts.facebook}</span>
        <hr />
        <span>github: {profile.contacts.github}</span>
      </div>
    </div>
  );
};




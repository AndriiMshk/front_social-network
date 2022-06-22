import React from 'react';
import style from './ProfileInfo.module.css';
import { Preloader } from '../../common/Preloader/Preloader';
import { ProfileType } from '../ProfileContainer';
import { ProfileStatus } from './ProfileStatus';

export type ProfileInfoPropsTpe = {
  profile: ProfileType | null
  status: string
  updateUserStatus: (status: string) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsTpe> = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>

      <span>status: {props.status}</span>
      <div className={style.descriptionBlock}>
        <img src={props.profile.photos.small} alt="" />
        <ProfileStatus
          status={props.status}
          updateUserStatus={props.updateUserStatus}
        />
        <hr />
        <span>{props.profile.fullName}</span>
        <p>{props.profile.aboutMe}</p>
        <span>facebook: {props.profile.contacts.facebook}</span>
        <hr />
        <span>github: {props.profile.contacts.github}</span>
      </div>
    </div>
  );
};




import React from 'react';
import style from './ProfileInfo.module.css';
import { Preloader } from '../../common/Preloader/Preloader';
import { ProfileType } from '../ProfileContainer';
import { ProfileStatus } from './ProfileStatus';
import { EditableSpan } from './EditableSpan';

export type ProfileInfoPropsTpe = {
  profile: ProfileType | null
  status: string
  updateUserStatus: (status: string) => void
  isMyProfilePage: boolean
  setPhoto: any
  updateProfileAbout: (contact: string, value: string | boolean) => void
  updateProfileContacts: (contact: string, value: string) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsTpe> = (props) => {

  const onChangePhotoSelectorHandler = (file: FileList | null) => {
    if (file) {
      props.setPhoto(file[0]);
    }
  };

  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={style.descriptionBlock}>
        <div><h5>Name:</h5>{props.profile.fullName}</div>
        <img src={props.profile.photos.small} alt="" />
        {!props.isMyProfilePage &&
        <input
          type="file"
          onChange={(e) => onChangePhotoSelectorHandler(e.target.files)}
        />}
        <h5>Status:
          <ProfileStatus
            status={props.status}
            updateUserStatus={props.updateUserStatus}
          />
        </h5>
        <hr />
        <div>
          Looking for a job:
          {props.isMyProfilePage
            ? <span> {props.profile.lookingForAJob ? 'Yes' : 'No'}</span>
            : <input
              type="checkbox"
              checked={props.profile.lookingForAJob}
              onChange={(value) => props.updateProfileAbout('lookingForAJob', value.target.checked)}
            />}
        </div>
        {props.profile.lookingForAJob && <span>Skills:
          <EditableSpan
            value={props.profile.lookingForAJobDescription || ''}
            updateValue={(value) => props.updateProfileAbout('lookingForAJobDescription', value)}
            isMyProfilePage={props.isMyProfilePage}
          />
        </span>}
        <div><h5>AboutMe:</h5> <EditableSpan
          value={props.profile.aboutMe || ''}
          updateValue={(value) => props.updateProfileAbout('aboutMe', value)}
          isMyProfilePage={props.isMyProfilePage}
        /></div>
        <hr />
        <div><h5>Contacts:</h5></div>
        {Object.keys(props.profile.contacts).map((el, index) => {
            if (!props.isMyProfilePage) {
              return (
                <div key={index}><h5>{el}: </h5>
                  <EditableSpan
                    //            @ts-ignore
                    value={props.profile.contacts[el]}
                    updateValue={(value) => props.updateProfileContacts(el, value)}
                    isMyProfilePage={props.isMyProfilePage}
                  />
                </div>);
            } else { // @ts-ignore
              if (props.profile.contacts[el]) {
                return (
                  <div key={index}><h5>{el}: </h5>
                    {/*@ts-ignore*/}
                    <div>{props.profile.contacts[el]}</div>
                  </div>);
              }
            }
          },
        )}
      </div>
    </div>
  );
};





import React from 'react';
import style from './ProfileInfo.module.css';
import { Preloader } from '../../common/Preloader/Preloader';
import { EditableSpan } from './EditableSpan';
import { ProfileType } from '../../../api/api';

export const ProfileInfo: React.FC<ProfileInfoPropsTpe> = (
  {
    setPhoto,
    profile,
    isMyProfilePage,
    updateProfileAbout,
    status,
    updateUserStatus,
    updateProfileContacts,
    error,
  }) => {

  const onChangePhotoSelectorHandler = (file: FileList | null) => {
    if (file) {
      setPhoto(file[0]);
    }
  };

  if (!profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={style.descriptionBlock}>
        <div><h3><EditableSpan
          isMyProfilePage={isMyProfilePage}
          value={profile.fullName || ''}
          updateValue={(value) => updateProfileAbout('fullName', value)}
        /></h3></div>
        <img src={profile.photos?.small || ''} alt="" />
        {isMyProfilePage &&
        <input
          type="file"
          onChange={(e) => onChangePhotoSelectorHandler(e.target.files)}
        />}
        <h5>Status:
          <EditableSpan
            value={status}
            updateValue={updateUserStatus}
            isMyProfilePage={isMyProfilePage}
          />
        </h5>
        <hr />
        <div>
          Looking for a job:
          {!isMyProfilePage
            ? <span> {profile.lookingForAJob ? 'Yes' : 'No'}</span>
            : <input
              type="checkbox"
              checked={profile.lookingForAJob}
              onChange={(value) => updateProfileAbout('lookingForAJob', value.target.checked)}
            />}
        </div>
        {profile.lookingForAJob && <span>Skills:
          <EditableSpan
            value={profile.lookingForAJobDescription || ''}
            updateValue={(value) => updateProfileAbout('lookingForAJobDescription', value)}
            isMyProfilePage={isMyProfilePage}
          />
        </span>}
        <div><h5>AboutMe:</h5> <EditableSpan
          value={profile.aboutMe || ''}
          updateValue={(value) => updateProfileAbout('aboutMe', value)}
          isMyProfilePage={isMyProfilePage}
        /></div>
        <hr />
        <div><h5>Contacts:</h5></div>
        {/*@ts-ignore*/}
        {Object.keys(profile.contacts).map((el, index) => {
            if (isMyProfilePage) {
              // @ts-ignore
              return (
                <div key={index}><h5>{el}: </h5>
                  <EditableSpan
                    // @ts-ignore
                    value={profile.contacts[el] || ''}
                    updateValue={(value) => updateProfileContacts(el, value)}
                    isMyProfilePage={isMyProfilePage}
                    error={error}
                  />
                </div>);
            } else { // @ts-ignore
              if (profile.contacts[el]) {
                return (
                  <div key={index}><h5>{el}: </h5>
                    {/*@ts-ignore*/}
                    <div>{profile.contacts[el]}</div>
                  </div>);
              }
            }
          },
        )}
        <div>{error}</div>
      </div>
    </div>
  );
};

export type ProfileInfoPropsTpe = {
  profile: ProfileType | null
  status: string
  updateUserStatus: (status: string) => void
  isMyProfilePage: boolean
  setPhoto: (file: File | null) => void
  updateProfileAbout: (contact: string, value: string | boolean) => void
  updateProfileContacts: (contact: string, value: string) => void
  error: string
}





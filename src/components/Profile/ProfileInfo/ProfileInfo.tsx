import React from 'react';
import style from './ProfileInfo.module.css';
import { Preloader } from '../../common/Preloader/Preloader';

export const ProfileInfo: React.FC<any> = (props) => {
  if (!props.profile) {
    return <Preloader />;

  }
  console.log(props.profile);
  return (
    <div>
      <div className={style.backImg}>
        <img
          src="https://www.learnrussianineu.com/wp-content/uploads/2020/01/Highest-Mountains-in-Russia.jpg" />
      </div>
      <div className={style.descriptionBlock}>
        <img src={props.profile.photos.small} alt="" />
        <hr/>
        <span>{props.profile.fullName}</span>
        <p>{props.profile.aboutMe}</p>
        <span>facebook: {props.profile.contacts.facebook}</span>
        <hr/>
        <span>github: {props.profile.contacts.github}</span>
        {/*AVA + Description*/}
      </div>
    </div>
  );
};


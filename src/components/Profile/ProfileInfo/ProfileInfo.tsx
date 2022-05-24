import React from 'react';
import style from './ProfileInfo.module.css';

export const ProfileInfo: React.FC = () => {
  return (
    <div>
      <div className={style.backImg}>
        <img
          src="https://www.learnrussianineu.com/wp-content/uploads/2020/01/Highest-Mountains-in-Russia.jpg" />
      </div>
      <div className={style.descriptionBlock}>
        AVA + Description
      </div>
    </div>
  );
};


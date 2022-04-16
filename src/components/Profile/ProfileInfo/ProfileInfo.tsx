import React from "react";
import style from './ProfileInfo.module.css'

type ProfileInfoPropsType = {}

const ProfileInfo: React.FC<ProfileInfoPropsType> = () => {
    return (
        <div>
            <div className={style.backImg}>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Passat_35i_B3_-_Cockpit.jpg/800px-Passat_35i_B3_-_Cockpit.jpg'/>
            </div>

            <div className={style.descriptionBlock}>
                AVA + Description
            </div>
        </div>
    )
}

export default ProfileInfo
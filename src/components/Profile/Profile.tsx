import React from 'react';
import s from './Profile.module.css'
import {MyPosts} from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {PostPropsType} from "../../index";

export const Profile: React.FC<any> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                postsData={props.postsData}
            />
        </div>
    )
}
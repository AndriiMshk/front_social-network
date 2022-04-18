import React from 'react';
import style from './Profile.module.css'
import {MyPosts} from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {PostPropsType} from "../../Redux/store";

type ProfilePropsType = {
    postsState: PostPropsType[]
    addPost: (postMessage: string) => void
}

export const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                postsData={props.postsState}
                addPost={props.addPost}
            />
        </div>
    )
}
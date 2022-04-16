import React from "react";
import {friendsType} from "../../../Redux/store";
import style from './BestFriedns.module.css'

type BestFriendsPropsType = {
    bestFriends: friendsType[]
}

export const BestFriends: React.FC<BestFriendsPropsType> = (props) => {
    return (
        <div className={style.friends}>
            {props.bestFriends.map( (friend, key:number) => {
                return (
                    <div>
                        <div className={style.friends_img}><img src={friend.ava} alt="ava"/></div>
                        <div className={style.friends_name}>{friend.name}</div>
                    </div>
                )
            })
            }
        </div>
    )
}
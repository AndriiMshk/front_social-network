import React from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/imgs/avatar.png';
import { UserType } from '../../Redux/users-reducer';
import style from './users.module.css';

type UserItemPropsType = {
  user: UserType
  isFollowingIngProgress: number[]
  unFollow: (usedId: number) => void
  follow: (usedId: number) => void
}
export const UserItem: React.FC<UserItemPropsType> = (props) => {

  const isFollowButtonDisabled = props.isFollowingIngProgress.some(id => id === props.user.id)

  return (
    <div className={style.userItem}>
          <span>
            <div className={style.avatar}>
              <NavLink to={'/profile/' + props.user.id}>
              <img src={props.user.photos.small
                ? props.user.photos.small
                : userPhoto}
                   alt="avatar" />
                </NavLink>
            </div>
            <div>
              {!props.user.followed
                ? <button
                  disabled={isFollowButtonDisabled}
                  onClick={() => props.follow(props.user.id)}
                >follow</button>
                : <button
                  disabled={isFollowButtonDisabled}
                  onClick={() => props.unFollow(props.user.id)}
                >unFollow</button>}
                </div>
                </span>
      <span>
          <span>
            <div>{props.user.name}</div>
            <div>{props.user.status}</div>
          </span>
        </span>
    </div>);
};
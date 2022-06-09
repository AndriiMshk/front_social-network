import React from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/imgs/avatar.png';
import { usersAPI } from '../../api/api';
import { UserType } from '../../Redux/users-reduc';

type UserItemPropsType = {
  user: UserType
  isFollowingIngProgress: number[]
  followingInProgress: (userId: number, inProgress: boolean) => void
  unFollow: (id: number) => void
  follow: (id: number) => void
}
export const UserItem: React.FC<UserItemPropsType> = (props) => {
  return (
    <div>
          <span>
            <div className="avatar">
              <NavLink to={'/profile/' + props.user.id}>
              <img src={props.user.photos.small
                ? props.user.photos.small
                : userPhoto}
                   alt="avatar" />
                </NavLink>
            </div>
            <div>
              {props.user.followed
                ? <button
                  disabled={props.isFollowingIngProgress.some(id => id === props.user.id)}
                  onClick={() => {
                    props.followingInProgress(props.user.id, true);
                    usersAPI.unFollowDeleteRequest(props.user.id)
                      .then((data) => {
                        if (data.resultCode === 0) {
                          props.unFollow(props.user.id);
                        }
                        props.followingInProgress(props.user.id, false);
                      });
                  }}
                >follow</button>
                : <button
                  disabled={props.isFollowingIngProgress.some(id => id === props.user.id)}
                  onClick={() => {
                    props.followingInProgress(props.user.id, true);
                    usersAPI.followPostRequest(props.user.id).then((data) => {
                      if (data.resultCode === 0) {
                        props.follow(props.user.id);
                      }
                      props.followingInProgress(props.user.id, false);
                    });
                  }}
                >unFollow</button>}
                </div>
                </span>
      <span>
          <span>
            <div>{props.user.name}</div>
            <div>{props.user.status}</div>
          </span>
          <span>
            <div>{'user.location.country'}</div>
            <div>{'user.location.city'}</div>
          </span>
        </span>
      {'user.fullName'}
    </div>);
};
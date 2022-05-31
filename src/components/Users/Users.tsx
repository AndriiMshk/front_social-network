import React from 'react';
import style from './users.module.css';
import { UserType } from '../../Redux/redux-store';
import userPhoto from '../../assets/imgs/avatar.png';
import { NavLink } from 'react-router-dom';

type UsersPropsType = {
  totalUsersCount: number
  pageSize: number
  users: UserType[]
  currentPage: number
  unFollow: (id: number) => void
  follow: (id: number) => void
  onPageChangeHandler: (page: number) => void
}
export const Users: React.FC<UsersPropsType> = (props) => {

  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = [];
  for (let i = props.currentPage - 2; i <= props.currentPage + 2; i++) {
    if (i >= 1 && i <= pagesCount) {
      pages.push(i);
    }
  }

  return (
    <div>
      <div>
        <div>
          {props.currentPage > 1 ? <span
            onClick={() => props.onPageChangeHandler(1)}
          >{1}...</span> : null}
          {pages.map((el, index) =>
              <span
                key={index}
                onClick={() => props.onPageChangeHandler(el)}
                className={props.currentPage === el
                  ? style.selectedPage
                  : ''}>{` ${el} `}
          </span>,
          )}
          {props.currentPage < pagesCount ? <span
            onClick={() => props.onPageChangeHandler(pagesCount)}
          >...{pagesCount}</span> : null}
        </div>
      </div>
      {props.users.map((user: UserType) => <div key={user.id}>
          <span>
            <div className="avatar">
              <NavLink to={'/profile/' + user.id}>
              <img src={user.photos.small
                ? user.photos.small
                : userPhoto} alt="avatar" />
                </NavLink>
            </div>
            <div>
              {user.followed
                ? <button
                  onClick={() => props.unFollow(user.id)}
                >follow</button>
                : <button
                  onClick={() => props.follow(user.id)}
                >unFollow</button>}
            </div>
          </span>
        <span>
            <span>
              <div>{user.name}</div>
              <div>{user.status}</div>
            </span>
            <span>
              <div>{'user.location.country'}</div>
              <div>{'user.location.city'}</div>
            </span>
          </span>
        {'user.fullName'}
      </div>)}
    </div>
  );
};
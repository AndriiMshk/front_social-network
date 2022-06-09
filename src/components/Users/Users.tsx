import React from 'react';
import style from './users.module.css';
import { UserItem } from './UserItem';
import { UserType } from '../../Redux/users-reduc';

type UsersPropsType = {
  totalUsersCount: number
  pageSize: number
  users: UserType[]
  currentPage: number
  onPageChangeHandler: (page: number) => void

  unFollow: (id: number) => void
  follow: (id: number) => void
  followingInProgress: (userId: number, inProgress: boolean) => void
  isFollowingIngProgress: number[]
}

export const Users: React.FC<UsersPropsType> = (
  {
    totalUsersCount,
    pageSize,
    users,
    currentPage,
    onPageChangeHandler,
  ...restProps},
) => {

  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = [];
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i >= 1 && i <= pagesCount) {
      pages.push(i);
    }
  }

  return (
    <div>
      <div>
        <div>
          {currentPage > 1
            ? <span
              onClick={() => onPageChangeHandler(1)}
            >{1}...</span>
            : null}
          {pages.map((el, index) =>
              <span
                key={index}
                onClick={() => onPageChangeHandler(el)}
                className={currentPage === el
                  ? style.selectedPage
                  : ''}>{` ${el} `}
          </span>,
          )}
          {currentPage < pagesCount
            ? <span
              onClick={() => onPageChangeHandler(pagesCount)}
            >...{pagesCount}</span>
            : null}
        </div>
      </div>
      {users.map((user: UserType) =>
        <UserItem
          key={user.id}
          user={user}
          {...restProps}
        />,
      )}
    </div>
  );
};


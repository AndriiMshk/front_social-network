import React from 'react';
import { UserItem } from './UserItem';
import { UserType } from '../../Redux/users-reducer';
import { Pagination } from './Pagination';

type UsersPropsType = {
  totalUsersCount: number
  pageSize: number
  users: UserType[]
  currentPage: number
  onPageChangeHandler: (page: number) => void
  unFollow: (usedId: number) => void
  follow: (usedId: number) => void
  isFollowingIngProgress: number[]
}

export const Users: React.FC<UsersPropsType> = (
  {
    totalUsersCount,
    pageSize,
    users,
    currentPage,
    onPageChangeHandler,
    ...restProps
  },
) => {

  return (
    <div>
      <Pagination
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChangeHandler={onPageChangeHandler} />
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


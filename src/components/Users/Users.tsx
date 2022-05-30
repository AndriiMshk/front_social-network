import axios from 'axios';
import React from 'react';
import userPhoto from '../../assets/imgs/avatar.png';
import { UsersTypeFromRedux, UserType } from '../../Redux/redux-store';
import style from './users.module.css';

type UsersPropsType = {
  users: UsersTypeFromRedux
  follow: (id: number) => void
  unFollow: (id: number) => void
  setUsers: (users: UsersTypeFromRedux) => void
  pageSize: number
  totalUsersCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
  setTotalUsersCount: (usersCount: number) => void
}

class Users extends React.Component<UsersPropsType, UsersTypeFromRedux> {
  componentDidMount(): void {
    if (this.props.users.length === 0) {
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then((response) => {
          this.props.setUsers(response.data.items);
          this.props.setTotalUsersCount(response.data.totalCount)
        });
    }
  }

  onPageChangeHandler = (page: number) => {
    this.props.setCurrentPage(page);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  };

//fix ANY
  render(): any {
    console.log(this.props.totalUsersCount);
    const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return (
      <div>
        <div>
          {pages.map((el, index) =>
            <span
              key={index}
              onClick={() => this.onPageChangeHandler(el)}
              className={this.props.currentPage === el
                ? style.selectedPage
                : ''}>{el + ' '}
            </span>,
          )}
        </div>
        {this.props.users.map((user: UserType) => <div key={user.id}>
        <span>
          <div className="avatar">
            <img src={user.photos.small
              ? user.photos.small
              : userPhoto} alt="avatar" />
          </div>
          <div>
            {user.followed
              ? <button
                onClick={() => this.props.unFollow(user.id)}
              >follow</button>
              : <button
                onClick={() => this.props.follow(user.id)}
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
  }
}

export default Users;
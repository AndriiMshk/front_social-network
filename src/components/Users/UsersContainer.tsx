import React from 'react';
import { connect } from 'react-redux';
import {
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  toggleIsFetchingAC,
  unFollowAC,
} from '../../Redux/users-reduc';
import { Dispatch } from 'redux';
import { StateTypeFromRedux, UsersTypeFromRedux } from '../../Redux/redux-store';
import axios from 'axios';
import { Users } from './Users';
import { Preloader } from '../common/Preloader/Preloader';

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
  isFetching: boolean
  toggleIsFetching: (isFetching: boolean) => void
}

class UsersAPIComponent extends React.Component<UsersPropsType, UsersTypeFromRedux> {
  componentDidMount(): void {
    this.props.toggleIsFetching(true);
    if (this.props.users.length === 0) {
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then((response) => {
          this.props.toggleIsFetching(false);
          this.props.setUsers(response.data.items);
          this.props.setTotalUsersCount(response.data.totalCount);
        });
    }
  }

  onPageChangeHandler = (page: number) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(page);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
      });
  };

//fix ANY
  render(): any {
    return (
      <>
        {this.props.isFetching
          ? <Preloader />
          : <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            users={this.props.users}
            currentPage={this.props.currentPage}
            unFollow={this.props.unFollow}
            follow={this.props.follow}
            onPageChangeHandler={this.onPageChangeHandler}
          />
        }
      </>
    );
  }
}

const mapStateToProps = (state: StateTypeFromRedux) => (
  {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
  }
);

const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    follow: (id: number) => dispatch(followAC(id)),
    unFollow: (id: number) => dispatch(unFollowAC(id)),
    setUsers: (users: UsersTypeFromRedux) => dispatch(setUsersAC(users)),
    setCurrentPage: (page: number) => dispatch(setCurrentPageAC(page)),
    setTotalUsersCount: (usersCount: number) => dispatch(setTotalUsersCountAC(usersCount)),
    toggleIsFetching: (isFetching: boolean) => dispatch(toggleIsFetchingAC(isFetching)),
  }
);

// можно удалить АС как в 58 уроке но я пока оставлю так

export const UsersContainer = connect(mapStateToProps,
  {
    follow: followAC,
    unFollow: unFollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    toggleIsFetching: toggleIsFetchingAC,
  },
)(UsersAPIComponent);
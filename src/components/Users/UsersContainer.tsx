import React from 'react';
import { connect } from 'react-redux';
import {
  followAC,
  followingInProgressAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  toggleIsFetchingAC,
  unFollowAC,
  UserType,
} from '../../Redux/users-reduc';
import { Dispatch } from 'redux';
import { StateTypeFromRedux } from '../../Redux/redux-store';
import { Users } from './Users';
import { Preloader } from '../common/Preloader/Preloader';
import { usersAPI } from '../../api/api';

type UsersPropsType = {
  users: UserType[]
  follow: (id: number) => void
  unFollow: (id: number) => void
  setUsers: (users: UserType[]) => void
  pageSize: number
  totalUsersCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
  setTotalUsersCount: (usersCount: number) => void
  isFetching: boolean
  toggleIsFetching: (isFetching: boolean) => void
  followingInProgress: (userId: number, inProgress: boolean) => void
  isFollowingIngProgress: number[]
}

class UsersAPIComponent extends React.Component<UsersPropsType, UserType[]> {
  componentDidMount(): void {
    this.props.toggleIsFetching(true);
    if (this.props.users.length === 0) {
      usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then((data) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(data.items);
        this.props.setTotalUsersCount(data.totalCount);
      });
    }
  }

  onPageChangeHandler = (page: number) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(page);
    usersAPI.getUsers(page, this.props.pageSize).then((data) => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
    });
  };

  render() {
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
            followingInProgress={this.props.followingInProgress}
            isFollowingIngProgress={this.props.isFollowingIngProgress}
          />
        }
      </>
    );
  }
}

type mapStateToPropsType = {
  users: UserType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  isFollowingIngProgress: number[]
}

type mapDispatchToPropsType = {
  follow: (id: number) => void
  unFollow: (id: number) => void
  setUsers: (users: UserType[]) => void
  setCurrentPage: (page: number) => void
  setTotalUsersCount: (usersCount: number) => void
  toggleIsFetching: (isFetching: boolean) => void
  followingInProgress: (userId: number, inProgress: boolean) => void

}

const mapStateToProps = (state: StateTypeFromRedux): mapStateToPropsType => (
  {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    isFollowingIngProgress: state.usersPage.followingInProgress,
  }
);

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => (
  {
    follow: (id: number) => dispatch(followAC(id)),
    unFollow: (id: number) => dispatch(unFollowAC(id)),
    setUsers: (users: UserType[]) => dispatch(setUsersAC(users)),
    setCurrentPage: (page: number) => dispatch(setCurrentPageAC(page)),
    setTotalUsersCount: (usersCount: number) => dispatch(setTotalUsersCountAC(usersCount)),
    toggleIsFetching: (isFetching: boolean) => dispatch(toggleIsFetchingAC(isFetching)),
    followingInProgress: (userId: number, inProgress: boolean) =>
      dispatch(followingInProgressAC(userId, inProgress)),
  }
);

// можно удалить АС как в 58 уроке но я пока оставлю так

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);

// вместо mapDispatchToProps можно напрямую кидать этот обьект
// {
//   follow: followAC,
//     unFollow: unFollowAC,
//   setUsers: setUsersAC,
//   setCurrentPage: setCurrentPageAC,
//   setTotalUsersCount: setTotalUsersCountAC,
//   toggleIsFetching: toggleIsFetchingAC,
//   followingInProgress: followingInProgressAC
// },

// пока оставил по старому
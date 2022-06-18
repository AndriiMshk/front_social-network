import React from 'react';
import { connect } from 'react-redux';
import { followTC, getUsersTC, setCurrentPageAC, unFollowTC, UserType } from '../../Redux/users-reduc';
import { StateTypeFromRedux } from '../../Redux/redux-store';
import { Users } from './Users';
import { Preloader } from '../common/Preloader/Preloader';

type UsersPropsType = {
  users: UserType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
  isFetching: boolean
  isFollowingIngProgress: number[]
  getUsers: (currentPage: number, pageSize: number) => void
  unFollow: (usedId: number) => void
  follow: (usedId: number) => void
}

class UsersAPIComponent extends React.Component<UsersPropsType, UserType[]> {
  componentDidMount(): void {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChangeHandler = (page: number) => {
    this.props.setCurrentPage(page);
    this.props.getUsers(page, this.props.pageSize);
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

export const UsersContainer = connect(mapStateToProps,
  {
    setCurrentPage: setCurrentPageAC,
    getUsers: getUsersTC,
    follow: followTC,
    unFollow: unFollowTC,
  },
)(UsersAPIComponent);

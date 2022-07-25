import React from 'react';
import { connect } from 'react-redux';
import { followTC, getUsersTC, setCurrentPageAC, unFollowTC, UserType } from '../../Redux/users-reducer';
import { RootStateType } from '../../Redux/store';
import { Users } from './Users';
import { Preloader } from '../common/Preloader/Preloader';
import { withAuthRedirectHOC } from '../../HOC/AuthRedirectHOC';
import { compose } from 'redux';
import {
  getCurrentPage,
  getIsFetching, getIsFollowingIngProgress,
  getPageSize,
  getTotalUsersCount,
  getUsersSelector,
} from '../../Redux/selectors/user-selectors';

class UsersContainer extends React.Component<UsersPropsType, UserType[]> {
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

const mapStateToProps = (state: RootStateType): mapStateToPropsType => (
  {
    users: getUsersSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    isFollowingIngProgress: getIsFollowingIngProgress(state),
  }
);

export default compose<React.ComponentType>(
  connect(mapStateToProps,
    {
      setCurrentPage: setCurrentPageAC,
      getUsers: getUsersTC,
      follow: followTC,
      unFollow: unFollowTC,
    },
  ),
  withAuthRedirectHOC,
)(UsersContainer);

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

type mapStateToPropsType = {
  users: UserType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  isFollowingIngProgress: number[]
}
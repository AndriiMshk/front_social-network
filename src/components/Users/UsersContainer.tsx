import React from 'react';
import { connect } from 'react-redux';
import { followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unFollowAC } from '../../Redux/users-reduc';
import Users from './Users';
import { Dispatch } from 'redux';
import { StateTypeFromRedux, UsersTypeFromRedux } from '../../Redux/redux-store';

const mapStateToProps = (state: StateTypeFromRedux) => (
  {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
  }
);

const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    follow: (id: number) => dispatch(followAC(id)),
    unFollow: (id: number) => dispatch(unFollowAC(id)),
    setUsers: (users: UsersTypeFromRedux) => dispatch(setUsersAC(users)),
    setCurrentPage: (page: number) => dispatch(setCurrentPageAC(page)),
    setTotalUsersCount: (usersCount: number) => dispatch(setTotalUsersCountAC(usersCount))
  }
);

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
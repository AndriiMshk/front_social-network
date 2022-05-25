import React from 'react';
import { connect } from 'react-redux';
import { followAC, setUsersAC, unFollowAC } from '../../Redux/users-reduc';
import Users from './Users';

const mapStateToProps = (state: any) => ({ users: state.usersPage.users });

const mapDispatchToProps = (dispatch: any) => (
  {
    follow: (id: number) => dispatch(followAC(id)),
    unFollow: (id: number) => dispatch(unFollowAC(id)),
    setUsers: (users: any) => dispatch(setUsersAC(users)),
  }
);

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
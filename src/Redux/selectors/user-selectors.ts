import { StateTypeFromRedux } from '../redux-store';
import { createSelector } from 'reselect';
import { UserType } from '../users-reduc';

export const getUsers = (state: StateTypeFromRedux) => state.usersPage.users;
export const getPageSize = (state: StateTypeFromRedux) => state.usersPage.pageSize;
export const getTotalUsersCount = (state: StateTypeFromRedux) => state.usersPage.totalUsersCount;
export const getCurrentPage = (state: StateTypeFromRedux) => state.usersPage.currentPage;
export const getIsFetching = (state: StateTypeFromRedux) => state.usersPage.isFetching;
export const getIsFollowingIngProgress = (state: StateTypeFromRedux) => state.usersPage.followingInProgress;

export const getUsersSelector = createSelector(
  getUsers,
  (users: UserType[]) => users);

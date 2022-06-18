import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '73298759-1bcc-4e14-8998-d86b90add1ac',
  },
});

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return (
      instance
        .get(`users?page=${currentPage}&count=${pageSize}`)
        .then((response) => response.data));
  },
  followPostRequest(userId: number) {
    return (
      instance
        .post(`follow/${userId}`)
        .then((response) => response.data)
    );
  },
  unFollowDeleteRequest(userId: number) {
    return (
      instance
        .delete(`/follow/${userId}`)
        .then((response) => response.data)
    );
  },
};

export const authAPI = {
  authGetRequest() {
    return (
      instance
        .get(`auth/me`)
        .then((response) => response.data)
    );
  },
}


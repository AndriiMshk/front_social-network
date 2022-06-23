import axios from 'axios';
import { FormDataType } from '../components/Login/Login';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '45fe12af-5e56-44d3-88b2-da820e41e4f3',
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
  loginRequest(formData: FormDataType) {
    return (
      instance.post(`/auth/login`, formData)
    )
  }
};

export const profileAPI = {
  getProfile(userId: number) {
    return (
      instance.get(`/profile/${userId}`)
    );
  },
  getStatus(userId: number) {
    return (
      instance.get(`/profile/status/${userId}`)
    );
  },
  updateStatus(status: string) {
    return instance.put(`/profile/status`, { status });
  },
};


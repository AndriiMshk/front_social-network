import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'abb3a345-b7d8-4f0f-8c61-af2582f7869f',
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
        .post<ResponseTypeAPI>(`follow/${userId}`)
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
  loginRequest(email: string, password: string, rememberMe: boolean = false) {
    return (
      instance.post(`/auth/login`, { email, password, rememberMe })
    );
  },
  logoutRequest() {
    return instance.delete(`/auth/login`);
  },
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

export type ResponseTypeAPI<Data = {}> = {
  data: Data,
  messages: string[],
  resultCode: number
}

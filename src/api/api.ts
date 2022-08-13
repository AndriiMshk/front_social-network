import axios from 'axios';

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
  loginRequest(email: string, password: string, rememberMe: boolean, captcha: string | null) {
    return (
      instance.post(`/auth/login`, { email, password, rememberMe, captcha })
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
  setPhoto(photoFile: any) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instance.put(`/profile/photo`, formData,
      { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  updateProfile(updatedProfile: UpdatedProfileType) {
    return instance.put(`/profile`, updatedProfile);
  },
};

export const securityAPI = {
  getCaptcha() {
    return instance.get('/security/get-captcha-url');
  },
};

export type ResponseTypeAPI<Data = {}> = {
  data: Data,
  messages: string[],
  resultCode: number
}

export type UpdatedProfileType = {
  aboutMe?: string
  userId?: number
  lookingForAJob?: boolean
  lookingForAJobDescription?: string
  fullName?: string
  contacts?: {
    github?: string
    vk?: string
    facebook?: string
    instagram?: string
    twitter?: string
    website?: string
    youtube?: string
    mainLink?: string
  }
}

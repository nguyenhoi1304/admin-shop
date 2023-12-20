import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: (page, limit) => {
    const url = `/users?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  login: (body) => {
    const url = `/admin/login`;
    return axiosClient.post(url, body);
  },

  register: (body) => {
    const url = `/register/`;
    return axiosClient.post(url, body);
  },
};

export default UserAPI;

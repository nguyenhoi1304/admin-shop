import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "/users";
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

import axios from 'axios';
import { baseURL } from '../consts/api.const';
import { IUserInfo } from '../interfaces/entites/user-info';

class AxiosConfiguration {
  initAxiosInstance = () => {
    const axiosInstance = axios.create({
      // baseURL: 'https://reqres.in/api', // URL cơ bản của API
      baseURL: baseURL, // URL cơ bản của API
      headers: {
        'Content-Type': 'application/json' // Đặt kiểu nội dung mặc định là JSON
      }
    });

    // Request Interceptor: Trước khi yêu cầu được gửi đi
    axiosInstance.interceptors.request.use(
      function (config) {
        // Thực hiện các tác vụ trước khi gửi yêu cầu
        // Ví dụ: Thêm tiêu đề xác thực vào yêu cầu
        // config.headers.Authorization = 'Bearer token123';
        return config;
      },
      function (error) {
        // Xử lý lỗi request
        return Promise.reject(error);
      }
    );

    // Response Interceptor: Sau khi nhận phản hồi
    axiosInstance.interceptors.response.use(
      function (response) {
        // Thực hiện các tác vụ sau khi nhận phản hồi
        // Ví dụ: Xử lý dữ liệu phản hồi
        return response;
      },
      function (error) {
        // Xử lý lỗi response
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  };

  getAxiosToken = () => {
    return _axios.defaults.headers.common.Authorization;
  };

  setAxiosToken = (token: string, deleteIfExists: boolean) => {
    if (!token || token.trim() === '') {
      return;
    }

    const currentAuth = _axios.defaults.headers.common.Authorization;
    if (currentAuth === 'Bearer ' + token) {
      return;
    }

    if (deleteIfExists) {
      delete _axios.defaults.headers.common.Authorization;
    }

    _axios.defaults.headers.common.Authorization = 'Bearer ' + token;
  };

  deleteAxiosToken = () => {
    delete _axios.defaults.headers.common.Authorization;
  };

  setUserInfo = (userInfo: IUserInfo | undefined) => {
    if (userInfo) _userInfo = { ...userInfo };
    else _userInfo = undefined;
  };
  getUserInfo = () => {
    return _userInfo;
  };
}

export const axiosConfiguration = new AxiosConfiguration();

export const _axios = axiosConfiguration.initAxiosInstance();

export let _userInfo: IUserInfo | undefined = {
  username: '',
  name: '',
  email: ''
};

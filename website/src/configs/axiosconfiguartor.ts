import axios from 'axios';

class AxiosConfiguration {
  initAxiosInstance = () => {
    const axiosInstance = axios.create({
      // baseURL: 'https://reqres.in/api', // URL cơ bản của API
      baseURL: 'https://api.vebo.xyz/api/', // URL cơ bản của API
      timeout: 10000, // Thời gian chờ tối đa là 10 giây
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

  setAxiosToken = (token: string, deleteIfExists: boolean) => {
    if (!token || token.trim() === '') {
      return;
    }

    const currentAuth = axios.defaults.headers.common.Authorization;
    if (currentAuth === 'Bearer ' + token) {
      return;
    }

    if (deleteIfExists) {
      delete axios.defaults.headers.common.Authorization;
    }

    axios.defaults.headers.common.Authorization = 'Bearer ' + token;
  };

  deleteAxiosToken = () => {
    delete axios.defaults.headers.common.Authorization;
  };
}

export const axiosConfiguration = new AxiosConfiguration();

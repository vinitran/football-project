import axios, { Axios, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { axiosConfiguration } from '../configs/axiosconfiguartor';


export const useAxios = makeUseAxios({
  axios: axiosConfiguration.initAxiosInstance()
});

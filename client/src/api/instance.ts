import axios from 'axios'
import { baseRequest } from './baseRequest';
import { IAuthResponse } from './../types/responses/IAuthResponse';

export const instance = axios.create({
  withCredentials: true,
  baseURL: baseRequest
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

instance.interceptors.response.use(config => config, async (err) => {
  const originalRequest = err.config
  if(err.response.status == 401 && err.config && !err.config._isRetry) {
    originalRequest._isRetry = true
    try {
      const resp = await axios.get<IAuthResponse>(`${baseRequest}/refresh`, { withCredentials: true })
      localStorage.setItem('token', resp.data.accessToken)
      return instance.request(originalRequest)
    } catch (error) {
      console.log('The user is not authenticated');
    }
  }
  throw err
})
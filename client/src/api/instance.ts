import axios from 'axios'
import { baseRequest } from './baseRequest';

export const instance = axios.create({
  withCredentials: true,
  baseURL: baseRequest
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})
import axios from 'axios'

export const API_URL = 'http://localhost:5000/api'

export const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})
import { AxiosResponse } from 'axios';
import { IAuthResponse } from '../../types/responses/IAuthResponse';
import { instance } from '../instance';

const registration = async (
  email: string,
  password: string,
): Promise<AxiosResponse<IAuthResponse>> => {
  return instance.post<IAuthResponse>('/registration', { email, password });
};

const login = async (
  email: string,
  password: string,
): Promise<AxiosResponse<IAuthResponse>> => {
  return instance.post<IAuthResponse>('/login', { email, password });
};

const logout = async (): Promise<void> => {
  return instance.post('/logout');
};

export const authEndpoints = {
  registration,
  login,
  logout,
};

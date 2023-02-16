import { AxiosResponse } from 'axios';
import { instance } from '../instance';
import { IUser } from './../../types/IUser';

export const fetchUsers = async (): Promise<AxiosResponse<IUser[]>> => {
  return await instance.get<IUser[]>('/users');
};

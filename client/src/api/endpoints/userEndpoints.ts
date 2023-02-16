import { AxiosResponse } from 'axios';
import { instance } from '../instance';
import { IUser } from './../../types/IUser';

const fetchUsers = async (): Promise<AxiosResponse<IUser[]>> => {
  return await instance.get<IUser[]>('/users');
};

export const userEndpoints = {
  fetchUsers
} 
import { instance } from '..';
import { IUser } from './../../types/IUser';
import { AxiosResponse } from 'axios';

export const fetchUsers = async (): Promise<AxiosResponse<IUser[]>> => {
  return await instance.get<IUser[]>('/users')
}
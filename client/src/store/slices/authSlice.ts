import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser';
import { authEndpoints } from './../../api/endpoints/authEndpoints';
import axios from 'axios'
import { IAuthResponse } from './../../types/responses/IAuthResponse';
import { baseRequest } from './../../api/baseRequest';

export interface AuthState {
  isAuth: boolean;
  user: IUser;
}

const initialState: AuthState = {
  isAuth: false,
  user: { email: '', id: '', isActivated: false },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    }
  },
});

export const { setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;

export const registration = async (email: string, password: string) => {
  try {
    const resp = await authEndpoints.registration(email, password);
    localStorage.setItem('token', JSON.stringify(resp.data.accessToken));
    setAuth(true);
    setUser(resp.data.user);
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const resp = await authEndpoints.login(email, password);
    localStorage.setItem('token', JSON.stringify(resp.data.accessToken));
    setAuth(true);
    setUser(resp.data.user);
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await authEndpoints.logout();
    localStorage.removeItem('token');
    setAuth(false);
    setUser({} as IUser);
  } catch (error) {
    console.log(error);
  }
};

export const checkAuth = async () => {
  try {
    const resp = await axios.get<IAuthResponse>(`${baseRequest}/refresh`, { withCredentials: true })
    localStorage.setItem('token', JSON.stringify(resp.data.accessToken));
    setAuth(true);
    setUser(resp.data.user);
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
}


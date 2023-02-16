import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser';
import { authEndpoints } from './../../api/endpoints/authEndpoints';
import axios from 'axios'
import { IAuthResponse } from './../../types/responses/IAuthResponse';
import { baseRequest } from './../../api/baseRequest';
import { AppDispatch } from '../store';

export interface AuthState {
  isAuth: boolean
  user: IUser
  isLoading: boolean
}

const initialState: AuthState = {
  isAuth: false,
  user: { email: '', id: '', isActivated: false },
  isLoading: false
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
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  },
});

export const { setAuth, setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;

export const registration = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    console.log(email, password);

    const resp = await authEndpoints.registration(email, password);
    localStorage.setItem('token', JSON.stringify(resp.data.accessToken));
    dispatch(setAuth(true));
    dispatch(setUser(resp.data.user))
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const resp = await authEndpoints.login(email, password);
    localStorage.setItem('token', resp.data.accessToken);
    dispatch(setAuth(true))
    dispatch(setUser(resp.data.user))
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await authEndpoints.logout();
    localStorage.removeItem('token');
    dispatch(setAuth(false))
    dispatch(setUser({} as IUser))
  } catch (error) {
    console.log(error);
  }
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true))
  try {
    const resp = await axios.get<IAuthResponse>(`${baseRequest}/refresh`, { withCredentials: true })
    localStorage.setItem('token', JSON.stringify(resp.data.accessToken));
    dispatch(setAuth(true))
    dispatch(setUser(resp.data.user))
    console.log(resp);
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false))
  }
}

import { IUser } from './../types/IUser';
import { authEndpoints } from '../api/endpoints/authEndpoints';

let isAuth = false;
let user = {} as IUser;

const setAuth = (bool: boolean) => {
  isAuth = bool;
};

const setUser = (newUser: IUser) => {
  user = newUser;
};


const registration = async (email: string, password: string) => {
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

const login = async (email: string, password: string) => {
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

const logout = async () => {
  try {
    await authEndpoints.logout();
    localStorage.removeItem('token');
    setAuth(false);
    setUser({} as IUser);
  } catch (error) {
    console.log(error);
  }
};

export const store = {
  registration,
  login,
  logout
}
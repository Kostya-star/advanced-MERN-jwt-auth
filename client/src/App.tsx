import { useEffect, useState } from 'react';
import { AuthForm } from './components/AuthForm/AuthForm';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  checkAuth,
  login,
  logout,
  registration,
} from './store/slices/authSlice';
import { userEndpoints } from './api/endpoints/userEndpoints';
import { IUser } from './types/IUser';
import './scss/all.scss';
import { Button } from './components/Button/Button';

const App = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const { isAuth, user, isLoading } = useAppSelector(({ auth }) => ({
    isAuth: auth.isAuth,
    user: auth.user,
    isLoading: auth.isLoading,
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  const getAllUsers = async () => {
    try {
      const resp = await userEndpoints.fetchUsers();
      setUsers(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = (email: string, password: string) => {
    console.log(email, password);
    
    dispatch(login(email, password));
  };

  const onRegistration = (email: string, password: string) => {
    dispatch(registration(email, password));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {!isAuth && (
        <>
          <h1>AUTHENTICATION</h1>
          <AuthForm onLogin={onLogin} onRegistration={onRegistration} />
        </>
      )}
      {isAuth && (
        <>
          <h1>{`The user is authenticated: ${user.email}`}</h1>
          <h1>
            {user.isActivated
              ? 'The email is activated'
              : 'Please, go to your email and activate the account'}
          </h1>
          <Button value="Log out" onClick={() => dispatch(logout())} />
          <Button value="Get all users" onClick={getAllUsers} />
          {users?.map((user) => (
            <p className='users_list' key={user.email}>User Email: {user.email}</p>
          ))}
        </>
      )}
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { checkAuth, login, logout, registration } from "./store/slices/authSlice";
import { userEndpoints } from './api/endpoints/userEndpoints';
import { IUser } from './types/IUser';


const App = () => {
  const[users, setUsers] = useState<IUser[]>([])

  const { isAuth, user, isLoading } = useAppSelector(({ auth }) => ({
    isAuth: auth.isAuth,
    user: auth.user,
    isLoading: auth.isLoading
  }))
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [])
  
  const getAllUsers = async () => {
    try {
      const resp = await userEndpoints.fetchUsers()
      setUsers(resp.data)
    } catch (error) {
      console.log(error);
    }
  }

  const onLogin = (email: string, password: string) => {
    dispatch(login(email, password))
  }

  const onRegistration = (email: string, password: string) => {
    dispatch(registration(email, password))
  }


  if(isLoading) {
    return (
      <div>Loading...</div>
    )
  }
  
  return (
    <div>
      {!isAuth && (
        <>
          <h1>Please, authenticate first!</h1>
          <LoginForm onLogin={onLogin} onRegistration={onRegistration} />
          <button onClick={getAllUsers}>Get all users</button>
        </>
      )}
      {isAuth && (
        <>
          <h1>{`The user is authenticated: ${user.email}`}</h1>
          <h1>{user.isActivated ? 'The email is successfully activated' : 'Please, go to your email and activate the account'}</h1>
          <button onClick={() => dispatch(logout())}>Log out</button>
          <button onClick={getAllUsers}>Get all users</button>
          {
            users?.map(user => (
              <p key={user.email}>User Email: {user.email}</p>
            ))
          }
        </>
      )}
    </div>
  );
}

export default App;

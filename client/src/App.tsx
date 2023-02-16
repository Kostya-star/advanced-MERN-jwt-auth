import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm } from "./components/LoginForm";
import { checkAuth } from "./store/slices/authSlice";
import { RootState, store, useAppDispatch, useAppSelector } from './store/store';


const App = () => {

  const { isAuth, user } = useAppSelector(({ auth }) => ({
    isAuth: auth.isAuth,
    user: auth.user
  }))
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(localStorage.getItem('token')) {
      checkAuth()
    }
  }, [])
  console.log(store.isAuth);
  
  return (
    <div>
      <h1>{ isAuth ? `The user is authenticated: ${store.user.email}` : 'Please, authenticate first!' }</h1>
      <LoginForm/>
    </div>
  );
}

export default App;

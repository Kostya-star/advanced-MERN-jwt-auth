import { useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { checkAuth, login, registration } from "./store/slices/authSlice";


const App = () => {
  const { isAuth, user } = useAppSelector(({ auth }) => ({
    isAuth: auth.isAuth,
    user: auth.user
  }))
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [])
  console.log(isAuth);

  const onLogin = (email: string, password: string) => {
    dispatch(login(email, password))
  }

  const onRegistration = (email: string, password: string) => {
    dispatch(registration(email, password))
  }

  
  return (
    <div>
      <h1>{ isAuth ? `The user is authenticated: ${user.email}` : 'Please, authenticate first!' }</h1>
      <LoginForm onLogin={onLogin} onRegistration={onRegistration}/>
    </div>
  );
}

export default App;

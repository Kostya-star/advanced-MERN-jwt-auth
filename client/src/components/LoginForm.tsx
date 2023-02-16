import { useState } from 'react';
import { login, registration } from '../store/slices/authSlice';
import { store } from './../store/store';

export const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder='Email'
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder='Password'
      />
      <button onClick={() => registration(email, password)}>Sign Up</button>
      <button onClick={() => login(email, password)}>Log in</button>
    </div>
  );
};

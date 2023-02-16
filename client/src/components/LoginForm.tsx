import { FC, useState } from 'react';

interface ILoginFormProps {
  onLogin: (email: string, password: string) => void
  onRegistration: (email: string, password: string) => void
}

export const LoginForm: FC<ILoginFormProps> = ({ onLogin, onRegistration }) => {

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
      <button onClick={() => onRegistration(email, password)}>Sign Up</button>
      <button onClick={() => onLogin(email, password)}>Log in</button>
    </div>
  );
};

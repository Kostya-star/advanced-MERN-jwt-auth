import { FC, useState } from 'react';
import { Button } from '../Button/Button';
import s from './AuthForm.module.scss';

interface ILoginFormProps {
  onLogin: (email: string, password: string) => void;
  onRegistration: (email: string, password: string) => void;
}

const navigate_buttons = ['Login', 'Sign up'];

export const AuthForm: FC<ILoginFormProps> = ({ onLogin, onRegistration }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [activeBtn, setActiveBtn] = useState(0);
  console.log(activeBtn);

  const onLoginRegistrationHandler = () => {
    
    navigate_buttons[activeBtn] === 'Login'
    ? onLogin(email, password)
    : onRegistration(email, password);
  }

  return (
    <div className={s.container}>
      <div className={s.navigate__buttons}>
        {navigate_buttons.map((btn, ind) => (
          <button
            key={ind}
            onClick={() => setActiveBtn(ind)}
            className={activeBtn === ind ? s.active : ''}
          >
            {btn}
          </button>
        ))}
      </div>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        <div className={s.submit__buttons}>
          <Button
            value={navigate_buttons[activeBtn]}
            onClick={onLoginRegistrationHandler}
          />
        </div>
      </form>
    </div>
  );
};

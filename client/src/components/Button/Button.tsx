import { FC } from 'react';
import s from './Button.module.scss';

interface IButtonProps {
  value: string;
  onClick: () => void;
}

export const Button: FC<IButtonProps> = ({ value, onClick }) => {
  return (
    <button onClick={onClick} className={s.btn}>
      {value}
    </button>
  );
};

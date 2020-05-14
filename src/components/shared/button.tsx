import { h } from 'preact';
import './button-style.scss';

interface ButtonProps {
  isSubmit: boolean;
  onClick?: (e: any) => void;
  children: any;
}

export const Button = ({ onClick, isSubmit, children }: ButtonProps) => {
  return (
    <button onClick={onClick} type={isSubmit ? 'submit' : 'button'}>
      {children}
    </button>
  );
};

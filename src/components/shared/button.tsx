import { h } from 'preact';

interface ButtonProps {
  isSubmit: boolean;
  onClick?: (e: any) => void;
  children: any;
}

export const Button = ({ onClick, isSubmit, children }: ButtonProps) => {
  return (
    <button
      class="button"
      onClick={onClick}
      type={isSubmit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};

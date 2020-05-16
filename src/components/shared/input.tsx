import { h } from 'preact';
import './input-style.scss';

interface InputProps {
  label?: string;
  value: string;
  type?: 'text' | 'number' | 'email';
  required?: boolean;
  onInput: (e: any) => void;
}

export const Input = ({
  onInput,
  label,
  value,
  required,
  type = 'text',
}: InputProps) => {
  return (
    <div className="wrapper">
      {label && <label>{label}</label>}
      <input onInput={onInput} value={value} required={required} type={type} />
    </div>
  );
};

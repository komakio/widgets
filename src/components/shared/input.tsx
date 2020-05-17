import { h } from 'preact';

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
    <div class="input">
      {label && <label>{label}</label>}
      <input onInput={onInput} value={value} required={required} type={type} />
    </div>
  );
};

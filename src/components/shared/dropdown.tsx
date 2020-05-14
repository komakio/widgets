import { h } from 'preact';
import './dropdown-style.scss';

interface InputProps {
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (e: any) => void;
}

export const Dropdown = ({
  onChange,
  label,
  options,
  placeholder,
}: InputProps) => {
  return (
    <div className="wrapper">
      <label>{label}</label>
      <select onChange={onChange} placeholder={placeholder}>
        <option value="" selected disabled>
          Select your country
        </option>
        {options.map((o) => (
          <option value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
};

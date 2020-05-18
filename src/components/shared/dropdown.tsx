import { h } from 'preact';

interface InputProps {
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  selected: string;
  required?: boolean;
  onChange: (e: any) => void;
}

export const Dropdown = ({
  onChange,
  label,
  options,
  placeholder,
  required,
  selected,
}: InputProps) => {
  return (
    <div class="dropdown">
      <label>{label}</label>
      <select
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        value={selected || ''}
      >
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

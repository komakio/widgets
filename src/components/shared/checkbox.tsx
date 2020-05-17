import { h, JSX } from 'preact';

interface CheckboxProps {
  label?: string | JSX.Element;
  isChecked?: boolean;
  required?: boolean;
  onChange?: (e: any) => void;
}

export const Checkbox = ({
  onChange,
  label,
  required,
  isChecked,
}: CheckboxProps) => {
  return (
    <div class="checkbox">
      <input
        onChange={onChange}
        checked={isChecked}
        required={required}
        type="checkbox"
      />
      <div class="checkbox__tick" />
      {label && <label>{label}</label>}
    </div>
  );
};

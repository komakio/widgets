import { h } from 'preact';
import { Dropdown } from './dropdown';
import { COUNTRIES } from '../../utils/countries';
import { Input } from './input';

interface PhoneInputProps {
  onChange: (...args: any[]) => void;
  required?: boolean;
  phone: {
    dialCode: string;
    number: string;
  };
}

export const PhoneInput = ({ onChange, phone, required }: PhoneInputProps) => {
  return (
    <div class="phone-input">
      <Dropdown
        label="Phone number"
        placeholder="Select country code"
        options={COUNTRIES.map((c) => ({
          value: c.dialCode,
          label: `${c.name} (${c.dialCode})`,
        }))}
        selected={phone?.dialCode}
        required={required}
        onChange={(e: any) => {
          onChange({ dialCode: e.target.value, number: phone.number });
        }}
      />
      <div class="phone-input__dash"> ⁠— </div>
      <Input
        value={phone?.number || ''}
        onInput={(e: any) => {
          onChange({ dialCode: phone.dialCode, number: e.target.value });
        }}
        required={required}
      />
    </div>
  );
};

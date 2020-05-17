import { h } from 'preact';
import { Dropdown } from './dropdown';
import { COUNTRIES } from '../../utils/countries';
import { Input } from './input';
import { useState } from 'preact/hooks';

interface PhoneInputProps {
  onChange: (...args: any[]) => void;
  required?: boolean;
}

export const PhoneInput = ({ onChange, required }: PhoneInputProps) => {
  const [dialCode, setDialCode] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div class="phone-input">
      <Dropdown
        label="Phone number"
        placeholder="Select country code"
        options={COUNTRIES.map((c) => ({
          value: c.dialCode,
          label: `${c.name} (${c.dialCode})`,
        }))}
        required={required}
        onChange={(e: any) => {
          setDialCode(e.target.value);
          onChange({ dialCode: e.target.value, phone });
        }}
      />
      <div class="phone-input__dash"> ⁠— </div>
      <Input
        value={phone}
        onInput={(e: any) => {
          console.log(e.target.value);
          
          setPhone(e.target.value);
          onChange({ dialCode, phone: e.target.value });
        }}
        required={required}
      />
    </div>
  );
};

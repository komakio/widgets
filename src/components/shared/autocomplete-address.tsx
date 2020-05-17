import { h } from 'preact';
import { Input } from './input';
import { useCallback, useRef, useState, useEffect } from 'preact/hooks';
import { GeolocationResult, autoComplete } from '../../api/location';
import { ReCaptchaInstance } from 'recaptcha-v3';

interface AutoCompleteAddressProps {
  onSelect: (...args: any) => (e: any) => void;
  captchaLoader: ReCaptchaInstance;
}

export const AutoCompleteAddress = ({
  onSelect,
  captchaLoader,
}: AutoCompleteAddressProps) => {
  const addressRef = useRef();
  const [address, setAddress] = useState('');
  const [autoCompletes, setAutoCompletes] = useState<GeolocationResult[]>([]);

  const onAddressChange = useCallback(
    async (text: string) => {
      //todo: add debounce
      const captcha = await captchaLoader.execute('address');
      const res = await autoComplete(text, captcha);
      setAutoCompletes(res);
    },
    [setAutoCompletes]
  );

  const clickOutsideHandler = useCallback((e: any) => {
    if (!e.path.includes(addressRef.current)) {
      setAutoCompletes([]);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler);
    return document.removeEventListener('click', clickOutsideHandler);
  }, [clickOutsideHandler]);

  return (
    <div class="autocomplete-address">
      <Input
        label="Address (Street &#38; Number)"
        value={address}
        onInput={(e: any) => {
          setAddress(e.target.value);
          onAddressChange(e.target.value);
        }}
      />
      <ul ref={addressRef.current}>
        {autoCompletes.map((a) => (
          <li
            onClick={onSelect({
              address: a.label,
              longitude: a.longitude,
              latitude: a.latitude,
            })}
          >{`${a.label}`}</li>
        ))}
      </ul>
    </div>
  );
};

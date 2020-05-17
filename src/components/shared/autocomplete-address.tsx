import { h } from 'preact';
import { Input } from './input';
import { useCallback, useRef, useState, useEffect } from 'preact/hooks';
import { GeolocationResult, autoComplete } from '../../api/location';
import { ReCaptchaInstance } from 'recaptcha-v3';

interface AutoCompleteAddressProps {
  onSelect: (...args: any) => void;
  captchaLoader: ReCaptchaInstance;
  required?: boolean;
}

export const AutoCompleteAddress = ({
  onSelect,
  captchaLoader,
  required,
}: AutoCompleteAddressProps) => {
  const addressRef = useRef();
  const [text, setText] = useState('');
  const [autoCompletes, setAutoCompletes] = useState<GeolocationResult[]>([]);

  const onAddressChange = useCallback(
    async (text: string) => {
      //todo: add debounce
      if (!text.trim()) {
        return;
      }
      const captcha = await captchaLoader.execute('address');
      const res = await autoComplete(text, captcha);
      setAutoCompletes(res);
    },
    [setAutoCompletes, captchaLoader]
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
        value={text}
        required={required}
        onInput={(e: any) => {
          onAddressChange(e.target.value);
        }}
      />
      <ul ref={addressRef.current}>
        {autoCompletes.map((a) => (
          <li
            onClick={() => {
              onSelect({
                raw: a.label,
                longitude: a.longitude,
                latitude: a.latitude,
              });
              setText(a.label);
              setAutoCompletes([]);
            }}
          >{`${a.label}`}</li>
        ))}
      </ul>
    </div>
  );
};

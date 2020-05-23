import { h } from 'preact';
import { Input } from './input';
import { useCallback, useRef, useState, useEffect } from 'preact/hooks';
import { GeolocationResult, autoComplete } from '../../api/location';
import { ReCaptchaInstance } from 'recaptcha-v3';

interface AutoCompleteAddressProps {
  onSelect: (...args: any) => void;
  onInput: (text: string) => void;
  captchaLoader: ReCaptchaInstance;
  required?: boolean;
  addressText: string;
}

export const AutoCompleteAddress = ({
  onSelect,
  onInput,
  captchaLoader,
  addressText,
  required,
}: AutoCompleteAddressProps) => {
  const addressRef = useRef<HTMLUListElement>();
  const [autoCompletes, setAutoCompletes] = useState<GeolocationResult[]>([]);
  const timeout = useRef();

  const onAddressChange = useCallback(
    async (text: string) => {
      if (timeout.current) {
        return;
      }

      if (!text.trim()) {
        setAutoCompletes([]);
        return;
      }

      timeout.current = setTimeout(async () => {
        const captcha = await captchaLoader.execute('address');
        const res = await autoComplete(text, captcha);
        timeout.current = null;
        setAutoCompletes(res);
      }, 500);
    },
    [setAutoCompletes, captchaLoader, timeout]
  );

  useEffect(() => {
    const clickOutsideHandler = (e: any) => {
      if (!e.path.includes(addressRef.current)) {
        setAutoCompletes([]);
      }
    };

    document.addEventListener('click', clickOutsideHandler);
    return () => {
      document.removeEventListener('click', clickOutsideHandler);
      clearTimeout(timeout.current as NodeJS.Timeout);
    };
  }, [addressRef, timeout]);

  return (
    <div class="autocomplete-address">
      <Input
        label="Address"
        value={addressText}
        required={required}
        onInput={(e: any) => {
          onInput(addressText);
          onAddressChange(e.target.value);
        }}
      />
      <ul ref={addressRef}>
        {autoCompletes.map((a) => (
          <li
            onClick={() => {
              onSelect({
                raw: a.label,
                longitude: a.longitude,
                latitude: a.latitude,
              });
              onInput(a.label);
              setAutoCompletes([]);
            }}
          >{`${a.label}`}</li>
        ))}
      </ul>
    </div>
  );
};

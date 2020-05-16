import { h, createRef } from 'preact';
import { ProfileRequestCreation } from './models';
import { createRequest } from '../api/profile';
import { COUNTRIES } from '../utils/countries';
import { autoComplete, GeolocationResult } from '../api/location';
import { Input } from './shared/input';
import { Dropdown } from './shared/dropdown';
import { Button } from './shared/button';
import { useState, useCallback, useEffect } from 'preact/hooks';
import './style.scss';

interface RequestFormProps {
  color: string;
}

export const RequestForm = (props: RequestFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [phone, setPhone] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [autoCompletes, setAutoCompletes] = useState<GeolocationResult[]>([]);
  const addressRef = createRef();

  const onSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();

      try {
        const profile: ProfileRequestCreation = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: {
            location: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            raw: address,
          },
          phone: { number: dialCode, dialCode: phone },
        };

        await createRequest(profile);
      } catch (e) {
        throw e;
      }
    },
    [firstName, lastName, email, longitude, latitude, address, dialCode, phone]
  );

  const onAddressChange = useCallback(
    async (text: string) => {
      //todo: add debounce
      const res = await autoComplete(text);
      setAutoCompletes(res);
    },
    [setAutoCompletes]
  );

  const onAddressSelection = useCallback(
    (address: GeolocationResult) => () => {
      setLongitude(address.longitude);
      setLatitude(address.latitude);
    },
    [setLongitude, setLatitude]
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
    <form onSubmit={onSubmit}>
      <div class="row">
        <div class="field">
          <Input
            label="First name"
            value={firstName}
            onInput={(e: any) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div class="field">
          <Input
            label="Last name"
            value={lastName}
            onInput={(e: any) => {
              setLastName(e.target.value);
            }}
          />
        </div>
      </div>
      <div class="row address">
        <div class="field">
          <Input
            label="Address (Street &#38; Number)"
            value={address}
            onInput={(e: any) => {
              setAddress(e.target.value);
              onAddressChange(e.target.value);
            }}
          />
          <ul class="address-options" ref={addressRef}>
            {autoCompletes.map((a) => (
              <li onClick={onAddressSelection(a)}>{`${a.label}`}</li>
            ))}
          </ul>
        </div>
        <div class="field">
          <Input
            type="email"
            label="Email"
            value={email}
            onInput={(e: any) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>
      <div class="row">
        <div class="field">
          <Dropdown
            label="Phone number"
            placeholder="Select country code"
            options={COUNTRIES.map((c) => ({
              value: c.dialCode,
              label: `${c.name} (${c.dialCode})`,
            }))}
            onChange={(e: any) => setDialCode(e.target.value)}
          />
          <Input
            value={phone}
            onInput={(e: any) => {
              setPhone(e.target.value);
            }}
          />
        </div>
      </div>
      <Button isSubmit>Send a request</Button>
    </form>
  );
};

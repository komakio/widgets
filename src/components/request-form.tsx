import { h } from 'preact';
import { ProfileRequestCreation } from '../models';
import { createRequest } from '../api/profile';
import { Input } from './shared/input';
import { Button } from './shared/button';
import { useState, useCallback } from 'preact/hooks';
import { load, ReCaptchaInstance } from 'recaptcha-v3';
import { useAsyncEffect } from '../utils/hooks';
import { AutoCompleteAddress } from './shared/autocomplete-address';
import { PhoneInput } from './shared/phone-input';
import '../styles/index.scss';

interface RequestFormProps {
  color: string;
}

export const RequestForm = (props: RequestFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [captchaLoader, setCaptchaLoader] = useState<ReCaptchaInstance>(null);
  const [address, setAddress] = useState({
    raw: '',
    longitude: 0,
    latitude: 0,
  });
  const [phone, setPhone] = useState<ProfileRequestCreation['phone']>({
    dialCode: '',
    number: '',
  });

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
              coordinates: [address.longitude, address.latitude],
            },
            raw: address.raw,
          },
          phone,
        };

        console.log({profile});
        
        const captcha = await captchaLoader.execute('requestHelp');
        await createRequest(profile, captcha);
      } catch (e) {
        throw e;
      }
    },
    [
      firstName,
      lastName,
      email,
      address,
      phone,
      captchaLoader,
    ]
  );

  useAsyncEffect(async (isActive) => {
    const loader = await load('6Lc2ReUUAAAAAM-UBGGFTLOELBlVRme90hR-F1AM');
    if (!isActive()) {
      return;
    }
    setCaptchaLoader(loader);
  });

  return (
    <form onSubmit={onSubmit} class="request-form">
      <div class="request-form__row">
        <div class="request-form__field">
          <Input
            label="First name"
            value={firstName}
            onInput={(e: any) => {
              setFirstName(e.target.value);
            }}
            required
          />
        </div>
        <div class="request-form__field">
          <Input
            label="Last name"
            value={lastName}
            onInput={(e: any) => {
              setLastName(e.target.value);
            }}
            required
          />
        </div>
      </div>
      <div class="request-form__row">
        <div class="request-form__field">
          <AutoCompleteAddress
            onSelect={setAddress}
            captchaLoader={captchaLoader}
            required
          />
        </div>
        <div class="request-form__field">
          <Input
            type="email"
            label="Email"
            value={email}
            onInput={(e: any) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
      </div>
      <div class="request-form__row">
        <div class="request-form__field">
          <PhoneInput onChange={setPhone} required />
        </div>
      </div>
      <div class="request-form__row">
        <Button isSubmit>Send a request</Button>
      </div>
    </form>
  );
};

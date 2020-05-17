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
import { Environment } from '../environment';
import '../styles/index.scss';
import { Checkbox } from './shared/checkbox';

interface RequestFormProps {
  color: string;
}

export const RequestForm = (props: RequestFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [captchaLoader, setCaptchaLoader] = useState<ReCaptchaInstance>(null);
  const [tickTerms, setTickTerms] = useState(false);
  const [tickPolicy, setTickPolicy] = useState(false);
  const [tickConsent, setTickConsent] = useState(false);
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

        const captcha = await captchaLoader.execute('requestHelp');
        await createRequest(profile, captcha);
        reset();
      } catch (e) {
        throw e;
      }
    },
    [firstName, lastName, email, address, phone, captchaLoader]
  );

  const reset = useCallback(() => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setAddress(null);
    setPhone(null);
    setTickTerms(false);
    setTickPolicy(false);
    setTickConsent(false);
  }, []);

  useAsyncEffect(async (isActive) => {
    const loader = await load(Environment.recaptchaSiteKey);
    if (!isActive()) {
      return;
    }
    setCaptchaLoader(loader);
  });

  return (
    <form onSubmit={onSubmit} class="request-form">
      <div class="request-form__title">
        FILL IN THE QUESTIONNAIRE BELOW AND WE’LL SEND YOUR REQUEST TO
        VOLUNTEERS NEAR YOU!
      </div>
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
        <div class="request-form__field">
          <Checkbox
            required
            isChecked={tickTerms}
            onChange={() => setTickTerms(!tickTerms)}
            label={
              <div>
                I have read and agree with the{' '}
                <a href="https://komak.io/terms-of-service">
                  terms of service of Komak.io
                </a>
              </div>
            }
          />
          <Checkbox
            required
            isChecked={tickPolicy}
            label={
              <div>
                I understand and consent to the collection and use of my
                personal information, including my Health Data, as described in
                the <a href="https://komak.io/privacy">Privacy Policy</a>
              </div>
            }
          />
          <Checkbox
            required
            isChecked={tickConsent}
            label={
              <div>
                I agree with the processing of my email address by Komak for the
                purpose of establishing communication with their user volunteers
              </div>
            }
          />
        </div>
      </div>
      <div class="request-form__row">
        <Button isSubmit>Send a request</Button>
      </div>
    </form>
  );
};

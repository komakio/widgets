import { Component, h, createRef } from 'preact';
import { ProfileRequestCreation } from './models';
import { createRequest } from '../api/profile';
import { COUNTRIES } from '../utils/countries';
import { autoComplete, GeolocationResult } from '../api/location';
import './style.scss';
import { Input } from './shared/input';
import { Dropdown } from './shared/dropdown';
import { Button } from './shared/button';

interface RequestFormState {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  dialCode: string;
  phone: string;
  longitude: number;
  latitude: number;
  autoCompletes: GeolocationResult[];
}

interface RequestFormProps {
  color: string;
}

export default class RequestForm extends Component<
  RequestFormProps,
  RequestFormState
> {
  private addressRef;
  constructor(props: RequestFormProps) {
    super(props);
    this.addressRef = createRef();
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      dialCode: '',
      phone: '',
      longitude: 0,
      latitude: 0,
      autoCompletes: [],
    };
  }

  public onSubmit = async (event) => {
    event.preventDefault();

    try {
      const profile: ProfileRequestCreation = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        address: {
          location: {
            type: 'Point',
            coordinates: [this.state.longitude, this.state.latitude],
          },
          raw: this.state.address,
        },
        phone: { number: this.state.dialCode, dialCode: this.state.phone },
      };

      await createRequest(profile);
    } catch (e) {
      throw e;
    }
  };

  public onAddressChange = async (text: string) => {
    //todo: add debounce
    const res = await autoComplete(text);
    this.setState({ autoCompletes: res });
  };

  public clickOutsideHandler = (e: any) => {
    if (!e.path.includes(this.addressRef.current)) {
      this.setState({ autoCompletes: [] });
    }
  };

  public onAddressSelection = (address: GeolocationResult) => () => {
    this.setState({ longitude: address.longitude });
    this.setState({ latitude: address.latitude });
  };

  public componentDidMount = () => {
    document.addEventListener('click', this.clickOutsideHandler);
  };

  public componentWillUnmount = () => {
    document.removeEventListener('click', this.clickOutsideHandler);
  };

  public render(
    { color }: RequestFormProps,
    {
      firstName,
      lastName,
      address,
      email,
      phone,
      autoCompletes,
    }: RequestFormState
  ) {
    return (
      <form onSubmit={this.onSubmit}>
        <div class="row">
          <div class="field">
            <Input
              label="First name"
              value={firstName}
              onInput={(e: any) => {
                this.setState({ firstName: e.target.value });
              }}
            />
          </div>
          <div class="field">
            <Input
              label="Last name"
              value={lastName}
              onInput={(e: any) => {
                this.setState({ lastName: e.target.value });
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
                this.setState({ address: e.target.value });
                this.onAddressChange(e.target.value);
              }}
            />
            <ul class="address-options" ref={this.addressRef}>
              {autoCompletes.map((a) => (
                <li onClick={this.onAddressSelection(a)}>{`${a.label}`}</li>
              ))}
            </ul>
          </div>
          <div class="field">
            <Input
              type="email"
              label="Email"
              value={email}
              onInput={(e: any) => {
                this.setState({ email: e.target.value });
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
              onChange={(e: any) => this.setState({ dialCode: e.target.value })}
            />
            <Input
              value={phone}
              onInput={(e: any) => {
                this.setState({ phone: e.target.value });
              }}
            />
          </div>
        </div>
        <Button isSubmit>Send a request</Button>
      </form>
    );
  }
}

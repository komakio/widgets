import { Component, h } from 'preact';
import { ProfileRequestCreation } from './models';
import './style.scss';
import { createRequest } from '../api/profile';
import { COUNTRIES } from '../utils/countries';
import { autoComplete, GeolocationResult } from '../api/location';

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
  constructor(props) {
    super(props);
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
    //   setLoading(true);
    event.preventDefaultautoCompleteResult();

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

      const response = await createRequest(profile);

      console.log({ response });
    } catch (e) {
      throw e;
    }
  };

  public onAddressChange = async (text: string) => {
    // const nodeRef = useOnClickOutside(() => setOpen(false));
    // const [value] = useDebounce(text, 500);
    const res = await autoComplete(text);
    // this.setState({ longitude: res.longitude });
    // this.setState({ latitude: res.latitude });
    this.setState({ autoCompletes: res });
  };

  public render(
    { color }: RequestFormProps,
    {
      firstName,
      lastName,
      address,
      email,
      dialCode,
      phone,
      autoCompletes,
    }: RequestFormState
  ) {
    return (
      <form onSubmit={this.onSubmit}>
        <div class="row">
          <div class="field">
            <label>First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e: any) => {
                this.setState({ firstName: e.target.value });
              }}
            />
          </div>
          <div class="field">
            <label>Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e: any) => {
                this.setState({ lastName: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>Address (Street &#38; Number)</label>
            <input
              type="text"
              value={address}
              onChange={(e: any) => {
                this.setState({ address: e.target.value });
                this.onAddressChange(e.target.value);
              }}
            />
            <select>
              {autoCompletes.map((c) => (
                <option>{`${c.label}`}</option>
              ))}
            </select>
          </div>
          <div class="field">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e: any) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>Phone number</label>
            <select>
              {COUNTRIES.map((c) => (
                <option>{`${c.name} (${c.dialCode})`}</option>
              ))}
            </select>
            <input type="text" value={phone} />
          </div>
        </div>
        <button type="submit">Send a request</button>
      </form>
    );
  }
}

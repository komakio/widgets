import { Component, h } from 'preact';
import { ProfileRequestCreation } from './models';
import './style.scss';
import { createRequest } from '../api/profile';
import { COUNTRIES } from '../utils/countries';

interface RequestFormState {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  dialCode: string;
  phone: string;
  longitude: string;
  latitude: string;
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
      longitude: '',
      latitude: '',
    };
  }

  public onSubmit = async (event) => {
    //   setLoading(true);
    event.preventDefault();

    try {
      const profile: ProfileRequestCreation = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        address: {
          location: {
            type: 'Point',
            coordinates: [
              parseFloat(this.state.longitude as any),
              parseFloat(this.state.latitude as any),
            ],
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

  public onAddressChange = () => {
    console.log(1);
  };

  public render(
    { color },
    { firstName, lastName, address, email, dialCode, phone }
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
                this.onAddressChange();
              }}
            />
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

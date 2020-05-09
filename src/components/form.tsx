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
    };
  }

  public render(
    { color },
    { firstName, lastName, address, email, dialCode, phone }
  ) {
    const onSubmit = async (event) => {
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
                0,
                0,
                // parseFloat(this.state.longitude as any),
                // parseFloat(this.state.latitude as any),
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

    return (
      <form onSubmit={onSubmit}>
        <div class="row">
          <div class="field">
            <label>First name</label>
            <input type="text" value={this.state.firstName}></input>
          </div>
          <div class="field">
            <label>Last name</label>
            <input type="text" value={this.state.lastName}></input>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>Address (Street &#38; Number)</label>
            <input type="text" value={this.state.address}></input>
          </div>
          <div class="field">
            <label>Email</label>
            <input type="text" value={this.state.email}></input>
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
            <input type="text" value={this.state.phone}></input>
          </div>
        </div>
        <button type="submit">Send a request</button>
      </form>
    );
  }
}

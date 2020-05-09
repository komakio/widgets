import { Component, h } from 'preact';
import { ProfileRequestCreation } from './models';
import './style.scss';
import { createRequest } from '../api/profile';

interface RequestFormState {
  yo: string;
}

interface RequestFormProps {
  color: string;
}

export default class RequestForm extends Component<
  RequestFormProps,
  RequestFormState
> {
  public render({ color }, { yo }) {
    const onSubmit = async (data) => {
      //   setLoading(true);
      try {
        const profile: ProfileRequestCreation = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          address: {
            location: {
              type: 'Point',
              coordinates: [
                parseFloat(data.longitude as any),
                parseFloat(data.latitude as any),
              ],
            },
            raw: data.location,
          },
          phone: { number: data.phone, dialCode: data.dialCode },
        };

        const response = await createRequest(profile);
      } catch (e) {
        throw e;
      }
    };

    return (
      <form onSubmit={null} action="javascript:onSubmit()">
        <div class="row">
          <div class="field">
            <label>First name</label>
            <input type="text"></input>
          </div>
          <div class="field">
            <label>Last name</label>
            <input type="text"></input>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>Address (Street &#38; Number)</label>
            <input type="text"></input>
          </div>
          <div class="field">
            <label>Email</label>
            <input type="text"></input>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>Phone number</label>
            <select>
              <option>1</option>
              <option>2</option>
            </select>
            <input type="text"></input>
          </div>
        </div>
        <button type="submit">Send a request</button>
      </form>
    );
  }
}

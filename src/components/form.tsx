import { Component, h } from 'preact';
import { ProfileRequestCreation } from './models';
import './style.scss';

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
        const body: ProfileRequestCreation = {
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

        const response = await fetch('url//blablalba', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body), // body data type must match "Content-Type" header
        });

        return response.json();
        // setLoading(false);
        // setSuccess(true);
      } catch (e) {
        // setLoading(false);
        // setError(true);
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

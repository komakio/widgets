import { Component, h } from 'preact';
import { ProfileRequestCreation } from './models';
import '../style.css';

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
        <label>First name</label>
        <input type="text"></input>

        <label>Last name</label>
        <input type="text"></input>

        <label>Address (Street &#38; Number)</label>
        <input type="text"></input>

        <label>Email</label>
        <input type="text"></input>

        <label>Phone number</label>
        <select>
          <option>1</option>
          <option>2</option>
        </select>
        <input type="text"></input>

        <button type="submit">Send a request</button>
      </form>
    );
  }
}

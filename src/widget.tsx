import habitat from 'preact-habitat';
import { RequestForm } from './components/request-form';

const { render } = habitat(RequestForm);

render({
  selector: '.komak-request-form',
  defaultProps: undefined,
  inline: false,
  clean: false,
  clientSpecified: false,
});

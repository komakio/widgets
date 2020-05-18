import habitat from 'preact-habitat';
import { RequestForm } from './components/request-form';

const { render } = habitat(RequestForm);

render({
  selector: '.some-class', // Searches and mounts in <div class="some-class"></div>
  defaultProps: undefined, // Default props for all widgets
  inline: false,
  clean: false,
  clientSpecified: false,
});

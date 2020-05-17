import { render, h } from 'preact';
import { RequestForm } from './components/request-form';

render(<RequestForm color="red" />, document.querySelector('#root'));

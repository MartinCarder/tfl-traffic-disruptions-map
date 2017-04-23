import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

import Root from './components/index';

require('./styles/main.scss');

render(
  <Root />,
  window.document.getElementById('app'),
);

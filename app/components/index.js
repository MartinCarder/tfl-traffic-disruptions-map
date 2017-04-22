import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../stores/';

import Traffic from './traffic/'

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <Traffic />
  </Provider>
);

export default Root;

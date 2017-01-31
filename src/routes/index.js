// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

import React from 'react';
import {Route, getComponent } from 'react-router';

export default (
  <Route path="/" name="base" getComponent={(nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('../containers/App').default);
    }, 'BaseView');
  }} />
);
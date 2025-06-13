// src/custom-elements.d.ts

import * as React from 'react';

// Tell TS that these four GMP web-components exist,
// and that you can pass them any props without error.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmpx-api-loader': any;
      'gmp-map': any;
      'gmpx-place-picker': any;
      'gmp-advanced-marker': any;
    }
  }
}

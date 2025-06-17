// src/custom.d.ts

// Tell TS about video imports…
declare module '*.mp4';

// …and image imports:
declare module '*.png';
declare module '*.PNG'; // if you’re importing uppercase extensions
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';

// no imports/exports here!
declare namespace JSX {
  interface IntrinsicElements {
    'gmpx-api-loader': any;
    'gmp-map': any;
    'gmpx-place-picker': any;
    'gmp-advanced-marker': any;
  }
}

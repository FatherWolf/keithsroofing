declare module '*.mp4';
// src/custom.d.ts

// --- No imports/exports here! ---

declare namespace JSX {
  interface IntrinsicElements {
    'gmpx-api-loader': any;
    'gmp-map': any;
    'gmpx-place-picker': any;
    'gmp-advanced-marker': any;
  }
}

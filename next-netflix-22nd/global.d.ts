// Global JSX augmentation for custom elements used in the app
// Keeps Vercel/TS builds happy when consuming web components.

declare namespace JSX {
  interface IntrinsicElements {
    'lottie-player': any;
  }
}


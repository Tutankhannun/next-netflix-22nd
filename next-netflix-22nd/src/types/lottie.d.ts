import type React from 'react';
export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        autoplay?: boolean | '';
        loop?: boolean | '';
        src?: string;
        mode?: string;
        speed?: number | string;
        background?: string;
        renderer?: 'svg' | 'canvas' | 'html' | string;
        style?: React.CSSProperties;
        controls?: boolean | '';
      };
    }
  }
}

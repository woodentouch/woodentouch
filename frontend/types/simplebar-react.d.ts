declare module 'simplebar-react' {
  import * as React from 'react';
  export interface SimplebarProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    // Ajoute ici les autres props si tu les utilises vraiment
    [key: string]: any;
  }
  const SimpleBar: React.FC<SimplebarProps>;
  export default SimpleBar;
}

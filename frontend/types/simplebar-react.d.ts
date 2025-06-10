declare module 'simplebar-react' {
  import * as React from 'react';
  export interface SimplebarProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    scrollableNodeRef?: React.Ref<HTMLElement>;  // <-- ajouté ici
    // autres props si besoin
    [key: string]: any;
  }
  const SimpleBar: React.FC<SimplebarProps>;
  export default SimpleBar;
}


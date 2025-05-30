declare module 'simplebar-react' {
  import { ComponentType } from 'react';
  interface SimpleBarProps {
    children?: React.ReactNode;
    // ajoute d'autres props si besoin
  }
  const SimpleBar: ComponentType<SimpleBarProps>;
  export default SimpleBar;
}

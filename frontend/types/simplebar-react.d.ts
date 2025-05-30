declare module 'simplebar-react' {
  import * as React from 'react';

  export interface SimplebarProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    scrollableNodeRef?: React.Ref<HTMLElement>;
    clickOnTrack?: boolean;
    forceVisible?: boolean | 'x' | 'y';
    autoHide?: boolean;
    scrollbarMaxSize?: number;
    timeout?: number;
    visibleTimeout?: number;
    [key: string]: any;
  }

  const SimpleBar: React.FC<SimplebarProps>;

  export default SimpleBar;
}

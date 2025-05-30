declare module 'react-quill' {
  import { Component } from 'react';

  export interface QuillProps {
    value?: string;
    onChange?: (content: string, delta: any, source: any, editor: any) => void;
    id?: string; // Ajout de l'id pour correspondre à tes composants
    [key: string]: any;
  }

  // Alias pour compatibilité éventuelle avec ReactQuillProps
  export type ReactQuillProps = QuillProps;

  export default class ReactQuill extends Component<QuillProps> {}
}

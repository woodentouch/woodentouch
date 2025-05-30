declare module 'react-quill' {
  import { Component } from 'react';

  interface QuillProps {
    value?: string;
    onChange?: (content: string, delta: any, source: any, editor: any) => void;
    [key: string]: any;
  }

  export default class ReactQuill extends Component<QuillProps> {}
}

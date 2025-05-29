declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: any;
  export default src;
}

declare module '*.sass' {
  const content: Record<string, string>;
  export default content;
}

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}

interface GlobalQuote {
  '01. symbol': string;
  '02. open': string;
  '03. high': string;
  '04. low': string;
  '05. price': string;
  '06. volume': string;
  '07. latest trading day': string;
  '08. previous close': string;
  '09. change': string;
  '10. change percent': string;
}

declare namespace PrismaJson {
  type StockMetaData = {
    'Global Quote'?: GlobalQuote;
  };
}

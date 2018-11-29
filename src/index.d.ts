import { Body, Request, RequestInit } from 'node-fetch';

type Opts<Data> = RequestInit & {
  bodyReader?: (b: Body) => Promise<Data>,
};

export type UseFetch<Data> = (input: string | Request, opts?: Opts<Data>) => {
  error: Error | void,
  loading: boolean,
  data: Data | void,
};

// tslint:disable-next-line:no-any
export const useFetch: UseFetch<any>;
import { parseError } from "@/utils/errors";
import axios, { AxiosRequestConfig } from "axios";
import { Context } from "./context";

export const api = axios.create({
  withCredentials: true,
});

export type ErrorWrapper<TError> =
  | TError
  | { status: "unknown"; payload: string };

export type FetcherOptions<TBody, THeaders, TQueryParams, TPathParams> = {
  url: string;
  method: string;
  body?: TBody;
  headers?: THeaders;
  queryParams?: TQueryParams;
  pathParams?: TPathParams;
  signal?: AbortSignal;
} & Context["fetcherOptions"];

type HeadersInit = Record<string, string>;

export async function Fetch<
  TData,
  TError,
  TBody extends {} | FormData | undefined | null,
  THeaders extends {},
  TQueryParams extends {},
  TPathParams extends {},
>({
  url,
  method,
  body,
  headers,
  pathParams,
  queryParams,
  signal,
}: FetcherOptions<TBody, THeaders, TQueryParams, TPathParams>): Promise<TData> {
  try {
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      Credentials: "include",
      ...headers,
    };
    if (body instanceof FormData) {
      delete requestHeaders["Content-Type"];
    }

    const axiosConfig: AxiosRequestConfig = {
      url: `${resolveUrl(url, queryParams, pathParams)}`,
      method: method.toUpperCase() as AxiosRequestConfig["method"],
      data:
        body instanceof FormData
          ? body
          : body
          ? JSON.stringify(body)
          : undefined,
      headers: requestHeaders,
      withCredentials: true,
      signal,
    };

    const response = await api(axiosConfig);

    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      // removeToken();
      // window.location.href = "/login";
    }
    if (error.response) {
      throw {
        status: error.response.status,
        payload: parseError(error.response.data),
      } as ErrorWrapper<TError>;
    }
    throw { status: "unknown", payload: error.message } as ErrorWrapper<TError>;
  }
}

const resolveUrl = (
  url: string,
  queryParams: Record<string, string> = {},
  pathParams: Record<string, string> = {}
) => {
  let query = new URLSearchParams(queryParams).toString();
  if (query) query = `?${query}`;
  return (
    url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)] ?? "") + query
  );
};

export const fetch = Fetch;

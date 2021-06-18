import useSWR, { SWRConfiguration } from "swr";

let baseUrl = process.env.REACT_APP_API_URL ?? "";
if (baseUrl.charAt(baseUrl.length - 1) === "/") {
  baseUrl = baseUrl.slice(0, -1);
}

const defaultFetcher = (url: string, ...query: string[]) => {
  const newUrl = baseUrl + url + query.join(",");
  return fetch(newUrl).then((data) => data.json());
};

export function useApi(
  key: string | string[] | (() => string | string[]),
  fetcher: (...args: string[]) => Promise<any> = defaultFetcher,
  options?: SWRConfiguration,
) {
  const { error, data } = useSWR(key, fetcher, options);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

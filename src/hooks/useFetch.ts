/**
 * useFetch.ts
 */

import fetcher from "../utilities/fetcher";
import useSWR from "swr";

/**
 * 
 * @param {String} url
 * @param {RequestInit} options
 * 
 * @example
 * import useFetch from '@/hooks/useFetch'
 * 
 * // Use inside your component
 * const { data, error, isLoading } = useFetch<T>('/v1/shop/all');
 * 
 * // If you want to pass Body, it must be in the `options` prop
 * ... = useFetch<T>(endpoint, {
 *  body: ...
 * })
 */
const useFetch = <T,>(url: string | null, options?: RequestInit) => {
  const { data, error, isLoading } = useSWR(
    url,
    () => fetcher<T>(url, options),
    {
      refreshInterval: 60000,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return { data, error, isLoading };
};

export default useFetch;
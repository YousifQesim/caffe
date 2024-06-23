import api from './getServer';

const fetcher = async <T>(url: string | null, options?: RequestInit): Promise<T | null> => {
  const headers = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  const mergedOptions: RequestInit = {
    ...options,
    headers,
    method: options?.method || 'GET',
  };

  const response = await api(url, mergedOptions);

  if (!response.ok)
    throw new Error(`Error fetching data from ${url}: ${response.status} - ${response.statusText}`);

  return await response.json();
};

export default fetcher;

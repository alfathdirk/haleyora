import { useDirectusContext } from "./useDirectusContext";

interface ApiResponse<T> {
  data: T;
  meta?: {
    totalCount: number;
  };
}

interface FetchOptions<T = any> {
  headers?: HeadersInit;
  body?: BodyInit | Record<string, any> | null;  
  params?: Record<string, any>;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  transformResponse?: (data: any) => T;
}

interface FetchMethods {
  get: <T = any>(
    endpoint: string,
    options?: FetchOptions<T>,
  ) => Promise<ApiResponse<T>>;
  post: <T = any>(
    endpoint: string,
    options?: FetchOptions<T>,
  ) => Promise<ApiResponse<T>>;
  put: <T = any>(
    endpoint: string,
    options?: FetchOptions<T>,
  ) => Promise<ApiResponse<T>>;
  delete: <T = any>(
    endpoint: string,
    options?: FetchOptions<T>,
  ) => Promise<ApiResponse<T>>;
  patch: <T = any>(
    endpoint: string,
    options?: FetchOptions<T>,
  ) => Promise<ApiResponse<T>>;
}

export const useDirectusFetch = (): FetchMethods => {
  const { accessToken } = useDirectusContext();

  if (!accessToken) {
    throw new Error(
      "Token is not available. Make sure you are within a DirectusProvider.",
    );
  }

  const baseFetch = async <T>(
    url: string,
    {
      headers = {},
      body = null,
      method = "GET",
      params = {},
      transformResponse = (data: any) => data as T,
    } = {} as FetchOptions<T>,
  ): Promise<ApiResponse<T>> => {

    const endpoint = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`);

    // # Handling params
    Object.keys(params).forEach((key) => {
      endpoint.searchParams.append(key, params[key]);
    });

    const defaultHeaders = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    // # Final Combine.
    const finalOptions: RequestInit = {
      method,
      headers: new Headers({ ...defaultHeaders, ...headers }),
      body: ["POST", "PUT", "PATCH"].includes(method)
        ? JSON.stringify(body)
        : null,
    };

    try {
      const response = await fetch(endpoint.toString(), finalOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return { data: transformResponse(data) }; // Apply any transformation to the data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error making fetch call:", error);
      throw error;
    }
  };

  return {
    get: (endpoint, options) =>
      baseFetch(endpoint, { ...options, method: "GET" }),
    post: (endpoint, options) =>
      baseFetch(endpoint, { ...options, method: "POST" }),
    put: (endpoint, options) =>
      baseFetch(endpoint, { ...options, method: "PUT" }),
    delete: (endpoint, options) =>
      baseFetch(endpoint, { ...options, method: "DELETE" }),
    patch: (endpoint, options) =>
      baseFetch(endpoint, { ...options, method: "PATCH" }),
  };
};

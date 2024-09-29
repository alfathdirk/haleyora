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

export interface DirectusFetchMethods {
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
  upload: <T = any>(
    endpoint: string,
    files: File[],
    options?: Omit<FetchOptions<T>, "body">,
  ) => Promise<ApiResponse<T>>;
}

const serializeParams = (params: any, prefix = ""): URLSearchParams => {
  const query = new URLSearchParams();

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      const fullKey = prefix ? `${prefix}[${key}]` : key;

      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        // Recursively serialize nested objects
        const nestedParams = serializeParams(value, fullKey);
        nestedParams.forEach((val, nestedKey) => {
          query.append(nestedKey, val);
        });
      } else {
        query.append(fullKey, value);
      }
    }
  }

  return query;
};

export const useDirectusFetch = (): DirectusFetchMethods => {
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

    // Handle params (now properly serializes nested objects)
    const serializedParams = serializeParams(params);
    serializedParams.forEach((value, key) => {
      endpoint.searchParams.append(key, value);
    });

    const defaultHeaders: HeadersInit = {
      Authorization: `Bearer ${accessToken}`,
    };

    if (!(body instanceof FormData)) {
      defaultHeaders["Content-Type"] = "application/json";
    }

    // Convert body to JSON string if it's a plain object
    const finalBody =
      body && !(body instanceof FormData) && typeof body === "object"
        ? JSON.stringify(body)
        : body;

    // Final options
    const finalOptions: RequestInit = {
      method,
      headers: new Headers({ ...defaultHeaders, ...headers }),
      body: ["POST", "PUT", "PATCH"].includes(method) ? finalBody : null,
    };

    try {
      const response = await fetch(endpoint.toString(), finalOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data =
        response?.statusText !== "No Content" ? await response?.json() : {};
      return { data: transformResponse(data) }; // Apply any transformation to the data
    } catch (error) {
      console.error("Error making fetch call:", error);
      throw error;
    }
  };

  const upload = async <T>(
    endpoint: string,
    files: File[],
    options: Omit<FetchOptions<T>, "body"> = {},
  ): Promise<ApiResponse<T>> => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    return baseFetch(endpoint, {
      ...options,
      method: "POST",
      body: formData,
    });
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
    upload,
  };
};

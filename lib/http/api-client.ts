import { getUserSession } from "../user-session";

type RequestConfig = RequestInit & {
  baseURL?: string;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

type InterceptorFn = (
  config: RequestConfig,
) => RequestConfig | Promise<RequestConfig>;
type ResponseInterceptorFn = (
  response: Response,
) => Response | Promise<Response>;
type ErrorInterceptorFn = (error: any) => any;

class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;
  private requestInterceptors: InterceptorFn[] = [];
  private responseInterceptors: ResponseInterceptorFn[] = [];
  private errorInterceptors: ErrorInterceptorFn[] = [];

  constructor(config?: { baseURL?: string; headers?: HeadersInit }) {
    this.baseURL = config?.baseURL || "";
    this.defaultHeaders = config?.headers || {};
  }

  // Add request interceptor
  addRequestInterceptor(fn: InterceptorFn) {
    this.requestInterceptors.push(fn);
  }

  // Add response interceptor
  addResponseInterceptor(fn: ResponseInterceptorFn) {
    this.responseInterceptors.push(fn);
  }

  // Add error interceptor
  addErrorInterceptor(fn: ErrorInterceptorFn) {
    this.errorInterceptors.push(fn);
  }

  private buildURL(
    url: string,
    params?: Record<string, string | number | boolean>,
  ): string {
    const fullURL = url.startsWith("http") ? url : `${this.baseURL}${url}`;

    if (!params) return fullURL;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    const separator = fullURL.includes("?") ? "&" : "?";
    return `${fullURL}${separator}${searchParams.toString()}`;
  }

  private async executeRequest(
    url: string,
    config: RequestConfig = {},
  ): Promise<any> {
    try {
      // Apply request interceptors
      let finalConfig = { ...config };
      for (const interceptor of this.requestInterceptors) {
        finalConfig = await interceptor(finalConfig);
      }

      // Build URL with params
      const fullURL = this.buildURL(url, finalConfig.params);

      // Merge headers (but don't override Content-Type if already set)
      const headers = {
        ...(!(finalConfig.body instanceof FormData) && {
          "Content-Type": "application/json",
        }),
        ...this.defaultHeaders,
        ...finalConfig.headers,
      };

      // Setup timeout
      const controller = new AbortController();
      const timeoutId = finalConfig.timeout
        ? setTimeout(() => controller.abort(), finalConfig.timeout)
        : null;

      // Build fetch options with Next.js cache config
      const fetchOptions: RequestInit = {
        ...finalConfig,
        headers,
        signal: controller.signal,
      };

      // Include Next.js specific options if provided
      if (finalConfig.next) {
        (fetchOptions as any).next = finalConfig.next;
      }

      // Make the request
      let response = await fetch(fullURL, fetchOptions);

      if (timeoutId) clearTimeout(timeoutId);

      // Apply response interceptors
      for (const interceptor of this.responseInterceptors) {
        response = await interceptor(response);
      }

      // Handle non-ok responses
      if (!response.ok) {
        const errRes: any = await response.json();
        const error = new Error(
          errRes.message ||
            `HTTP Error: ${errRes.status} ${
              errRes.statusText || "Something went wrong"
            }`,
        );
        (error as any).response = response;
        (error as any).status = response.status;
        console.error("API Error Response:", errRes);
        throw error;
      }

      // Parse response
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return await response.json();
      }
      return await response.text();
    } catch (error: any) {
      // Apply error interceptors
      let finalError = error;
      for (const interceptor of this.errorInterceptors) {
        finalError = await interceptor(finalError);
      }
      throw finalError;
    }
  }

  // HTTP Methods
  async get(url: string, config?: RequestConfig) {
    return this.executeRequest(url, { ...config, method: "GET" });
  }

  async post(url: string, data?: any, config?: RequestConfig) {
    const isFormData = data instanceof FormData;

    return this.executeRequest(url, {
      ...config,
      method: "POST",
      body: isFormData ? data : JSON.stringify(data),
      headers: isFormData
        ? { ...config?.headers } // Don't set Content-Type for FormData
        : { "Content-Type": "application/json", ...config?.headers },
    });
  }

  async put(url: string, data?: any, config?: RequestConfig) {
    const isFormData = data instanceof FormData;

    return this.executeRequest(url, {
      ...config,
      method: "PUT",
      body: isFormData ? data : JSON.stringify(data),
      headers: isFormData
        ? { ...config?.headers }
        : { "Content-Type": "application/json", ...config?.headers },
    });
  }

  async patch(url: string, data?: any, config?: RequestConfig) {
    const isFormData = data instanceof FormData;

    return this.executeRequest(url, {
      ...config,
      method: "PATCH",
      body: isFormData ? data : JSON.stringify(data),
      headers: isFormData
        ? { ...config?.headers }
        : { "Content-Type": "application/json", ...config?.headers },
    });
  }

  async delete(url: string, config?: RequestConfig) {
    return this.executeRequest(url, { ...config, method: "DELETE" });
  }
}

// Create and configure your API client
const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

// Example: Add auth token to all requests
apiClient.addRequestInterceptor(async (config) => {
  const token = await getUserSession();

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

// Example: Handle response logging
apiClient.addResponseInterceptor(async (response) => {
  console.log(`Response from ${response.url}:`, response.status);
  return response;
});

// Example: Handle errors globally
apiClient.addErrorInterceptor((error) => {
  console.error("API Error:", error.message);
  return error;
});

export default apiClient;

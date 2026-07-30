import { API_URL } from "./config";
import { cookies } from "next/headers";

type RequestOptions = RequestInit & {
  params?: Record<string, string | number>;
};

class ApiClient {
  private buildUrl(
    path: string,
    params?: Record<string, string | number>
  ) {
    const url = new URL(`${API_URL}${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    return url.toString();
  }

  private async request<T>(
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, headers, ...init } = options;

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const response = await fetch(this.buildUrl(path, params), {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
        ...headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();

      console.log("FAILED URL:", this.buildUrl(path, params));
      console.log("FAILED STATUS:", response.status);
      console.log("API ERROR:", error);

      throw new Error(
        `Request failed (${response.status}): ${error}`
      );
    }

    // Para endpoints que respondan 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  get<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "GET",
    });
  }

  post<T>(
    path: string,
    body?: unknown,
    options?: RequestOptions
  ) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(
    path: string,
    body?: unknown,
    options?: RequestOptions
  ) {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  patch<T>(
    path: string,
    body?: unknown,
    options?: RequestOptions
  ) {
    return this.request<T>(path, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(
    path: string,
    options?: RequestOptions
  ) {
    return this.request<T>(path, {
      ...options,
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();
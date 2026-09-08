export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://apighumkkad.allindiahub.com/api";

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function doRefreshToken(): Promise<string | null> {
  try {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("admin_refresh_token") : null;
    
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const data = await response.json();
    const result = data.data || data;
    const newAccessToken = result.accessToken || result.tokens?.accessToken;
    const newRefreshToken = result.refreshToken || result.tokens?.refreshToken;

    if (newAccessToken && typeof window !== "undefined") {
      localStorage.setItem("admin_access_token", newAccessToken);
      if (newRefreshToken) {
        localStorage.setItem("admin_refresh_token", newRefreshToken);
      }
      document.cookie = "admin_token=true; path=/; max-age=604800; SameSite=Lax";
      return newAccessToken;
    }

    return null;
  } catch (err) {
    if (typeof window !== "undefined") {
      document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      localStorage.removeItem("admin_access_token");
      localStorage.removeItem("admin_refresh_token");
      localStorage.removeItem("admin_user");
      // Only redirect if currently in an admin page
      if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin") {
        window.location.href = "/admin";
      }
    }
    return null;
  }
}

export const api = {
  /**
   * General fetch wrapper that includes credentials (cookies) for all requests
   * and automatically refreshes expired access tokens seamlessly.
   */
  async fetch(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${API_BASE_URL}${endpoint}`;

    const token = typeof window !== "undefined" ? localStorage.getItem("admin_access_token") : null;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
      credentials: "include",
    };

    let response = await fetch(url, config);

    // If 401 Unauthorized and not already an auth endpoint, attempt automatic token refresh
    if (response.status === 401 && !endpoint.includes("/auth/refresh") && !endpoint.includes("/auth/login")) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = doRefreshToken().finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;

      if (newAccessToken) {
        // Retry the original request with the renewed access token
        const retryHeaders: Record<string, string> = {
          ...headers,
          "Authorization": `Bearer ${newAccessToken}`,
        };

        response = await fetch(url, {
          ...config,
          headers: retryHeaders,
        });
      }
    }

    // If still not OK, parse error and throw
    if (!response.ok) {
      let errorMessage = "An error occurred";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = response.statusText;
      }

      // If it's a persistent 401 after refresh attempt, clear session and redirect
      if (response.status === 401 && typeof window !== "undefined" && !endpoint.includes("/auth/login")) {
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        localStorage.removeItem("admin_access_token");
        localStorage.removeItem("admin_refresh_token");
        localStorage.removeItem("admin_user");
        if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin") {
          window.location.href = "/admin";
        }
      }

      throw new Error(errorMessage);
    }

    return response.json();
  },

  get(endpoint: string, options?: RequestInit) {
    return this.fetch(endpoint, { ...options, method: "GET" });
  },

  post(endpoint: string, data?: any, options?: RequestInit) {
    return this.fetch(endpoint, {
      ...options,
      method: "POST",
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  },

  put(endpoint: string, data?: any, options?: RequestInit) {
    return this.fetch(endpoint, {
      ...options,
      method: "PUT",
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  },

  delete(endpoint: string, options?: RequestInit) {
    return this.fetch(endpoint, { ...options, method: "DELETE" });
  },
};

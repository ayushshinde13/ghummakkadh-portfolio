export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const api = {
  /**
   * General fetch wrapper that includes credentials (cookies) for all requests
   */
  async fetch(endpoint: string, options: RequestInit = {}) {
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
      // This is crucial: it sends and receives httpOnly cookies (like accessToken)
      credentials: "include",
    };

    const response = await fetch(url, config);

    // If it's an error status, we can try to parse the backend's error message
    if (!response.ok) {
      let errorMessage = "An error occurred";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Fallback if not JSON
        errorMessage = response.statusText;
      }

      // Automatically handle 401 Unauthorized by clearing the hint cookie and redirecting
      if (response.status === 401 && typeof window !== "undefined") {
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        localStorage.removeItem("admin_access_token");
        localStorage.removeItem("admin_user");
        window.location.href = "/admin"; // Redirect to login
      }

      throw new Error(errorMessage);
    }

    return response.json();
  },

  get(endpoint: string, options?: RequestInit) {
    return this.fetch(endpoint, { ...options, method: "GET" });
  },

  post(endpoint: string, data: any, options?: RequestInit) {
    return this.fetch(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  put(endpoint: string, data: any, options?: RequestInit) {
    return this.fetch(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete(endpoint: string, options?: RequestInit) {
    return this.fetch(endpoint, { ...options, method: "DELETE" });
  },
};

// Minimal API client for the ERP backend

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export function getToken(): string | null {
  return localStorage.getItem("access_token");
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem("access_token", token);
  else localStorage.removeItem("access_token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  const headers: HeadersInit = { ...(options.headers || {}) };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) headers["Content-Type"] = headers["Content-Type"] || "application/json";

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return (await res.json()) as T;
  return (await res.text()) as unknown as T;
}

export const api = {
  // Auth endpoints
  loginWithUsername: async (username: string, password: string) => {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    const data = await request<{ access_token: string; token_type: string }>("/api/v1/auth/login", {
      method: "POST",
      body: form,
    });
    setToken(data.access_token);
    return data;
  },
  me: async () => request("/api/v1/auth/me"),
  // Users (admin)
  listUsers: async () => request("/api/v1/users"),
};

export default api;

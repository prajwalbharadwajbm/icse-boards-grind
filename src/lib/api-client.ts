"use client";

import { getAuthInstance } from "@/lib/firebase";

/** An error from one of our API routes, with a message that is safe to show */
export class ApiClientError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public body: Record<string, unknown> = {}
  ) {
    super(message);
  }
}

/** fetch() to our own /api routes with the signed-in student's Firebase ID token */
export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const user = getAuthInstance().currentUser;
  if (!user) throw new ApiClientError(401, "unauthenticated", "Sign in to continue");
  const token = await user.getIdToken();

  let res: Response;
  try {
    res = await fetch(path, {
      ...init,
      headers: {
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...init.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    throw new ApiClientError(0, "network", "You seem to be offline. Check your connection and try again");
  }

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: { code?: string; message?: string } } & Record<string, unknown>;
    throw new ApiClientError(res.status, body.error?.code || "error", body.error?.message || "Something went wrong. Try again", body);
  }
  return res;
}

export async function apiJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await apiFetch(path, init);
  return (await res.json()) as T;
}

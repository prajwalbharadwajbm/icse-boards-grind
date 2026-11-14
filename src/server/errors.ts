/** An error that is safe to show to the user, with an HTTP status and a stable code */
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
  }
}

export function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  });
}

/** Run a route body and turn thrown errors into JSON responses */
export async function handle(fn: () => Promise<Response>): Promise<Response> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof ApiError) {
      return json({ error: { code: err.code, message: err.message }, ...(err.details || {}) }, err.status);
    }
    console.error("[api] unexpected error", err);
    return json({ error: { code: "internal", message: "Something went wrong on our side. Try again" } }, 500);
  }
}

export async function readJson(req: Request, maxBytes = 200_000): Promise<unknown> {
  const text = await req.text();
  if (text.length > maxBytes) throw new ApiError(413, "too_large", "That request is too large");
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new ApiError(400, "bad_json", "The request body is not valid JSON");
  }
}

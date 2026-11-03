export type AppErrorCode =
  | "invalid_input"
  | "not_found"
  | "private"
  | "rate_limited"
  | "quota_exhausted"
  | "upstream"
  | "not_configured";

const statusByCode: Record<AppErrorCode, number> = {
  invalid_input: 400,
  not_found: 404,
  private: 404,
  rate_limited: 429,
  quota_exhausted: 503,
  upstream: 502,
  not_configured: 503,
};

/** An error whose message is safe to show to users. */
export class AppError extends Error {
  constructor(
    public code: AppErrorCode,
    message: string,
    public retryAfterSeconds?: number,
  ) {
    super(message);
  }

  get status() {
    return statusByCode[this.code];
  }
}

export function errorResponse(err: unknown): Response {
  if (err instanceof AppError) {
    const headers: HeadersInit = err.retryAfterSeconds ? { "Retry-After": String(err.retryAfterSeconds) } : {};
    return Response.json({ error: { code: err.code, message: err.message } }, { status: err.status, headers });
  }
  console.error("[api] unexpected error", err);
  return Response.json(
    { error: { code: "internal", message: "Something went wrong on our side. Please try again in a moment." } },
    { status: 500 },
  );
}

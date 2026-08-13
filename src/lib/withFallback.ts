/**
 * Runs a Supabase query but never leaves the UI hanging:
 * if the request errors, returns nothing, or takes too long,
 * the static fallback content is used instead.
 */
export async function withFallback<T>(
  query: () => Promise<{ data: T[] | null; error: unknown }>,
  fallback: T[],
  timeoutMs = 3500,
): Promise<T[]> {
  try {
    const result = await Promise.race([
      query(),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), timeoutMs)),
    ]);
    if (!result.error && result.data && result.data.length > 0) return result.data;
    return fallback;
  } catch {
    return fallback;
  }
}

import { useCallback, useState } from "react";

/**
 * useRateLimiter
 *
 * Caps how many times an action can run within a rolling time window.
 * Persisted in localStorage (keyed by `storageKey`) so refreshing the page
 * doesn't reset someone's attempt count.
 *
 * @param {Object} options
 * @param {number} options.maxAttempts - max allowed attempts per window (default 3)
 * @param {number} options.windowMs - window length in ms (default 60000 = 1 min)
 * @param {string} options.storageKey - localStorage key to track attempts under
 *
 * @returns {{
 *   isLimited: boolean,        // true if the limit is currently hit
 *   remaining: number,         // attempts left in the current window
 *   retryAfterMs: number,      // ms until the oldest attempt expires (0 if not limited)
 *   attempt: () => boolean     // call before firing the action; returns true if allowed
 * }}
 */
export function useRateLimiter({
  maxAttempts = 3,
  windowMs = 60_000,
  storageKey = "rateLimiter",
}) {
  const readTimestamps = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      const cutoff = Date.now() - windowMs;
      return parsed.filter((t) => t > cutoff);
    } catch {
      return [];
    }
  };

  const [timestamps, setTimestamps] = useState(readTimestamps);

  const isLimited = timestamps.length >= maxAttempts;
  const remaining = Math.max(0, maxAttempts - timestamps.length);
  const retryAfterMs = isLimited
    ? Math.max(0, timestamps[0] + windowMs - Date.now())
    : 0;

  // Call this right before performing the guarded action.
  // Returns true if the action is allowed to proceed, false if blocked.
  const attempt = useCallback(() => {
    const current = readTimestamps();

    if (current.length >= maxAttempts) {
      setTimestamps(current);
      return false;
    }

    const updated = [...current, Date.now()];
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setTimestamps(updated);
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxAttempts, windowMs, storageKey]);

  return { isLimited, remaining, retryAfterMs, attempt };
}

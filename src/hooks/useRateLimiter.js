import { useCallback, useEffect, useState } from "react";

export function useRateLimiter({
  maxAttempts = 3,
  windowMs = 60_000,
  storageKey = "rateLimiter",
}) {
  const readTimestamps = useCallback(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      const cutoff = Date.now() - windowMs;
      return Array.isArray(parsed) ? parsed.filter((t) => t > cutoff) : [];
    } catch {
      return [];
    }
  }, [storageKey, windowMs]);

  const [timestamps, setTimestamps] = useState(readTimestamps);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (timestamps.length === 0) return;

    const id = setInterval(() => {
      const fresh = readTimestamps();
      setTimestamps((prev) => (fresh.length === prev.length ? prev : fresh));
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, [timestamps.length, readTimestamps]);

  const isLimited = timestamps.length >= maxAttempts;
  const remaining = Math.max(0, maxAttempts - timestamps.length);
  const retryAfterMs = isLimited
    ? Math.max(0, timestamps[0] + windowMs - now)
    : 0;

  const attempt = useCallback(() => {
    const current = readTimestamps();

    if (current.length >= maxAttempts) {
      setTimestamps(current);
      return false;
    }

    const updated = [...current, Date.now()];
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (error) {
      console.warn("Storage unavailable; continuing without persistence.", error);
    }
    setTimestamps(updated);
    setNow(Date.now());
    return true;
  }, [maxAttempts, storageKey, readTimestamps]);

  return { isLimited, remaining, retryAfterMs, attempt };
}

"use client";

import { useCallback, useSyncExternalStore } from "react";

const cache = new Map<string, unknown>();
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function readSnapshot<T>(key: string, fallback: T): T {
  if (cache.has(key)) return cache.get(key) as T;

  let value = fallback;
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  cache.set(key, value);
  return value;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function write<T>(key: string, value: T) {
  cache.set(key, value);
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch {
    /* ignore quota errors */
  }
  emit();
}

/**
 * localStorage-backed state with `useSyncExternalStore`.
 *
 * Values are cached so snapshots are referentially stable (no re-render loops),
 * and the server snapshot is the fallback so hydration is deterministic. This
 * replaces the older "load in an effect" pattern that the React Compiler-era
 * lint rules discourage.
 */
export function useLocalStorage<T>(
  key: string,
  fallback: T,
): [T, (updater: T | ((prev: T) => T)) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => readSnapshot(key, fallback),
    () => fallback,
  );

  const setValue = useCallback(
    (updater: T | ((prev: T) => T)) => {
      const prev = readSnapshot(key, fallback);
      const next =
        typeof updater === "function" ? (updater as (prev: T) => T)(prev) : updater;
      write(key, next);
    },
    [key, fallback],
  );

  return [value, setValue];
}

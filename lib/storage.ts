// Safe localStorage helpers + a shared persistent store primitive.
// Stores are module-level singletons so every component reading the same
// key sees the same state without prop drilling or context.

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage unavailable (private mode, quota): keep the in-memory value
  }
}

export interface PersistentStore<T> {
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => T
  getServerSnapshot: () => T
  set: (updater: T | ((prev: T) => T)) => void
}

export function createPersistentStore<T>(key: string, fallback: T): PersistentStore<T> {
  let cache: T | null = null
  const listeners = new Set<() => void>()

  const getSnapshot = () => {
    if (cache === null) {
      cache = readJSON(key, fallback)
    }
    return cache
  }

  return {
    subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    getSnapshot,
    getServerSnapshot: () => fallback,
    set(updater) {
      const prev = cache === null ? readJSON(key, fallback) : cache
      const next = typeof updater === "function" ? (updater as (prev: T) => T)(prev) : updater
      if (next === prev) return
      cache = next
      writeJSON(key, next)
      listeners.forEach((listener) => listener())
    },
  }
}

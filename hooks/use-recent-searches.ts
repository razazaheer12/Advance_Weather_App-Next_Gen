"use client"

import { useCallback, useSyncExternalStore } from "react"
import { createPersistentStore } from "@/lib/storage"

export interface RecentSearch {
  name: string
  country: string
  at: number
}

const RECENTS_STORAGE_KEY = "weatherflow-recent-searches"
const MAX_RECENTS = 8

const store = createPersistentStore<RecentSearch[]>(RECENTS_STORAGE_KEY, [])

export function useRecentSearches() {
  const recents = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot)

  const addRecent = useCallback((entry: { name: string; country: string }) => {
    store.set((prev) => {
      const rest = prev.filter(
        (recent) =>
          !(recent.name.toLowerCase() === entry.name.toLowerCase() && recent.country === entry.country),
      )
      return [{ ...entry, at: Date.now() }, ...rest].slice(0, MAX_RECENTS)
    })
  }, [])

  const removeRecent = useCallback((name: string, country: string) => {
    store.set((prev) =>
      prev.filter(
        (recent) => !(recent.name.toLowerCase() === name.toLowerCase() && recent.country === country),
      ),
    )
  }, [])

  const clearRecents = useCallback(() => {
    store.set([])
  }, [])

  return { recents, addRecent, removeRecent, clearRecents }
}

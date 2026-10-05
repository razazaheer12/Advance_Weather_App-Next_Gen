"use client"

import { useCallback, useSyncExternalStore } from "react"
import { settingsStore, type UnitSystem } from "@/lib/settings"

export function useSettings() {
  const settings = useSyncExternalStore(
    settingsStore.subscribe,
    settingsStore.getSnapshot,
    settingsStore.getServerSnapshot,
  )

  const setUnits = useCallback((units: UnitSystem) => {
    settingsStore.set((prev) => (prev.units === units ? prev : { ...prev, units }))
  }, [])

  return { units: settings.units, setUnits }
}

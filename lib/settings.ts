import { createPersistentStore } from "@/lib/storage"

export type UnitSystem = "metric" | "imperial"

export interface Settings {
  units: UnitSystem
}

export const settingsStore = createPersistentStore<Settings>("weatherflow:settings", {
  units: "metric",
})

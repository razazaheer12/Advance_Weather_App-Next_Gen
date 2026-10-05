"use client"

import { useState, useEffect, useCallback } from "react"

const ONBOARDING_STORAGE_KEY = "weatherflow-onboarding-complete"

export type OnboardingStatus = "loading" | "onboarding" | "ready"

export function useOnboarding() {
  const [status, setStatus] = useState<OnboardingStatus>("loading")

  useEffect(() => {
    let completed = false
    try {
      completed = localStorage.getItem(ONBOARDING_STORAGE_KEY) === "true"
    } catch {
      completed = false
    }
    setStatus(completed ? "ready" : "onboarding")
  }, [])

  const completeOnboarding = useCallback(() => {
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, "true")
    } catch {
      // Storage unavailable (private mode): continue anyway, onboarding returns next launch
    }
    setStatus("ready")
  }, [])

  return { status, completeOnboarding }
}

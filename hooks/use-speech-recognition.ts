"use client"

import { useState, useCallback, useRef } from "react"

export interface SpeechRecognitionResult {
  transcript: string
  confidence: number
}

export interface UseSpeechRecognitionOptions {
  language?: string
  continuous?: boolean
  interimResults?: boolean
  maxAlternatives?: number
}

export function useSpeechRecognition(options: UseSpeechRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<any>(null)

  const { language = "en-US", continuous = false, interimResults = false, maxAlternatives = 1 } = options

  // Check if speech recognition is supported
  const checkSupport = useCallback(() => {
    const supported = "webkitSpeechRecognition" in window || "SpeechRecognition" in window
    setIsSupported(supported)
    return supported
  }, [])

  // Initialize speech recognition
  const initializeRecognition = useCallback(() => {
    if (!checkSupport()) {
      setError("Speech recognition is not supported in this browser")
      return null
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = continuous
    recognition.interimResults = interimResults
    recognition.lang = language
    recognition.maxAlternatives = maxAlternatives

    return recognition
  }, [language, continuous, interimResults, maxAlternatives, checkSupport])

  // Start listening
  const startListening = useCallback(
    (onResult?: (result: SpeechRecognitionResult) => void) => {
      if (isListening) return

      const recognition = initializeRecognition()
      if (!recognition) return

      recognitionRef.current = recognition
      setError(null)
      setTranscript("")

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1]
        const transcript = result[0].transcript
        const confidence = result[0].confidence

        setTranscript(transcript)

        if (onResult) {
          onResult({ transcript, confidence })
        }
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)

        const errorMessages: Record<string, string> = {
          "no-speech": "No speech was detected. Please try again.",
          "audio-capture": "Audio capture failed. Please check your microphone.",
          "not-allowed": "Microphone access was denied. Please allow microphone access.",
          network: "Network error occurred. Please check your connection.",
          aborted: "Speech recognition was aborted.",
          "language-not-supported": `Language "${language}" is not supported.`,
        }

        setError(errorMessages[event.error] || `Speech recognition error: ${event.error}`)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
        recognitionRef.current = null
      }

      try {
        recognition.start()
      } catch (err) {
        setError("Failed to start speech recognition")
        setIsListening(false)
      }
    },
    [isListening, initializeRecognition, language],
  )

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }, [])

  // Reset state
  const resetTranscript = useCallback(() => {
    setTranscript("")
    setError(null)
  }, [])

  return {
    isListening,
    isSupported: checkSupport(),
    error,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
  }
}

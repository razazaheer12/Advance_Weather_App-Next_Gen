"use client"

import { useState } from "react"
import { Mic, MicOff, Volume2, Globe, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { Card, CardContent } from "@/components/ui/card"

interface VoiceSearchProps {
  onResult: (query: string) => void
  disabled?: boolean
}

const SUPPORTED_LANGUAGES = [
  { code: "en-US", name: "English (US)", flag: "🇺🇸" },
  { code: "en-GB", name: "English (UK)", flag: "🇬🇧" },
  { code: "es-ES", name: "Spanish", flag: "🇪🇸" },
  { code: "fr-FR", name: "French", flag: "🇫🇷" },
  { code: "de-DE", name: "German", flag: "🇩🇪" },
  { code: "it-IT", name: "Italian", flag: "🇮🇹" },
  { code: "pt-BR", name: "Portuguese", flag: "🇧🇷" },
  { code: "ru-RU", name: "Russian", flag: "🇷🇺" },
  { code: "ja-JP", name: "Japanese", flag: "🇯🇵" },
  { code: "ko-KR", name: "Korean", flag: "🇰🇷" },
  { code: "zh-CN", name: "Chinese", flag: "🇨🇳" },
]

export function VoiceSearch({ onResult, disabled = false }: VoiceSearchProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(SUPPORTED_LANGUAGES[0])
  const [showTranscript, setShowTranscript] = useState(false)

  const { isListening, isSupported, error, transcript, startListening, stopListening, resetTranscript } =
    useSpeechRecognition({
      language: selectedLanguage.code,
      continuous: false,
      interimResults: true,
    })

  const handleVoiceSearch = () => {
    if (isListening) {
      stopListening()
      return
    }

    resetTranscript()
    setShowTranscript(true)

    startListening((result) => {
      if (result.confidence > 0.7) {
        onResult(result.transcript)
        setShowTranscript(false)
      }
    })
  }

  const handleLanguageChange = (language: (typeof SUPPORTED_LANGUAGES)[0]) => {
    setSelectedLanguage(language)
    if (isListening) {
      stopListening()
    }
  }

  if (!isSupported) {
    return (
      <Button variant="secondary" size="icon" disabled className="h-12 w-12 bg-white/50">
        <MicOff className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <div className="flex gap-2">
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="h-12 w-12 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg"
            disabled={disabled || isListening}
          >
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className="flex items-center gap-2"
            >
              <span>{lang.flag}</span>
              <span className="flex-1">{lang.name}</span>
              {selectedLanguage.code === lang.code && (
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Voice Search Button */}
      <Button
        type="button"
        variant="secondary"
        size="icon"
        onClick={handleVoiceSearch}
        disabled={disabled}
        className={`h-12 w-12 shadow-lg transition-all duration-200 ${
          isListening
            ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
            : "bg-white/95 backdrop-blur-sm hover:bg-white"
        }`}
      >
        {isListening ? <Volume2 className="h-5 w-5 animate-pulse" /> : <Mic className="h-5 w-5" />}
      </Button>

      {/* Transcript Display */}
      {showTranscript && (transcript || error || isListening) && (
        <Card className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-white/30 shadow-xl z-10">
          <CardContent className="p-4">
            {isListening && !transcript && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Listening... Speak now</span>
              </div>
            )}

            {transcript && (
              <div>
                <div className="text-sm text-muted-foreground mb-1">You said:</div>
                <div className="font-medium">{transcript}</div>
              </div>
            )}

            {error && <div className="text-destructive text-sm">{error}</div>}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VoiceSearch } from "@/components/voice-search"

interface SearchHeaderProps {
  onSearch: (query: string) => void
  onLocationSearch: () => void
  isLoading: boolean
}

export function SearchHeader({ onSearch, onLocationSearch, isLoading }: SearchHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
      setSearchQuery("")
    }
  }

  const handleVoiceResult = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  return (
    <div className="mb-8">
      <h1 className="text-5xl font-bold text-white text-center mb-2 text-balance drop-shadow-lg">Weather Forecast</h1>
      <p className="text-white/80 text-center mb-8 text-lg">Get real-time weather updates with voice search</p>

      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for any city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-white/95 backdrop-blur-sm border-white/30 shadow-lg text-base"
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <VoiceSearch onResult={handleVoiceResult} disabled={isLoading} />
          </div>

          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={onLocationSearch}
            disabled={isLoading}
            className="h-12 w-12 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg"
          >
            <MapPin className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

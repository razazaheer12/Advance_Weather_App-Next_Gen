"use client"

import type React from "react"
import { useRef } from "react"
import { Loader2, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  value: string
  onValueChange: (value: string) => void
  onSubmit: (query: string) => void
  loading?: boolean
  size?: "md" | "lg"
  placeholder?: string
  className?: string
}

export function SearchBar({
  value,
  onValueChange,
  onSubmit,
  loading = false,
  size = "md",
  placeholder = "Search for a city...",
  className,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const isLarge = size === "lg"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    const query = value.trim()
    if (!query) {
      inputRef.current?.focus()
      return
    }
    onSubmit(query)
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={cn("relative", className)}>
      <Search
        aria-hidden="true"
        className={cn(
          "text-muted-foreground pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
          isLarge ? "h-5 w-5" : "h-4 w-4",
        )}
      />
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search for a city"
        className={cn(
          "bg-card/80 border-border/50 shadow-sm backdrop-blur-sm transition-all duration-300 focus:shadow-md",
          isLarge ? "h-14 rounded-xl pl-12 pr-32 text-lg" : "h-11 rounded-xl pl-11 pr-28 text-base",
        )}
      />
      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
        {value.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Clear search"
            onClick={() => {
              onValueChange("")
              inputRef.current?.focus()
            }}
            className="text-muted-foreground h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button type="submit" disabled={loading} className={cn("rounded-lg", isLarge ? "h-10 px-6" : "h-8 px-4")}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </Button>
      </div>
    </form>
  )
}

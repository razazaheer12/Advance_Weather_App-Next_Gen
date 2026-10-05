"use client"

import { History, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRecentSearches } from "@/hooks/use-recent-searches"

interface RecentSearchesProps {
  onSelect: (cityName: string) => void
}

export function RecentSearches({ onSelect }: RecentSearchesProps) {
  const { recents, removeRecent, clearRecents } = useRecentSearches()

  if (recents.length === 0) return null

  return (
    <section className="animate-fade-in-up mt-8 w-full text-left" style={{ animationDelay: "140ms" }}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-muted-foreground flex items-center gap-1.5 text-sm font-semibold">
          <History className="h-3.5 w-3.5" aria-hidden="true" />
          Recent Searches
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearRecents}
          className="text-muted-foreground h-7 px-2 text-xs"
        >
          Clear
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {recents.map((recent) => (
          <span
            key={`${recent.name}-${recent.country}`}
            className="bg-card/80 border-border/50 flex items-center overflow-hidden rounded-full border shadow-sm backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => onSelect(recent.name)}
              className="hover:bg-accent/50 flex items-center gap-1.5 rounded-full py-1.5 pl-3 pr-1 text-sm transition-colors"
            >
              <span className="text-foreground font-medium">{recent.name}</span>
              <span className="text-muted-foreground text-xs">{recent.country}</span>
            </button>
            <button
              type="button"
              onClick={() => removeRecent(recent.name, recent.country)}
              aria-label={`Remove ${recent.name} from recent searches`}
              className="text-muted-foreground hover:text-foreground px-2 transition-colors"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </span>
        ))}
      </div>
    </section>
  )
}

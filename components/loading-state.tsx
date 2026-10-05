import { Card, CardContent } from "@/components/ui/card"

export function LoadingState() {
  return (
    <div className="mx-auto max-w-6xl space-y-6" aria-busy="true">
      <span className="sr-only">Loading weather data…</span>

      {/* Hero */}
      <Card className="bg-card/90 border-border/50 rounded-3xl shadow-xl backdrop-blur-sm">
        <CardContent className="p-6 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="bg-muted h-4 w-40 animate-pulse rounded-md" />
              <div className="bg-muted h-8 w-52 animate-pulse rounded-md" />
            </div>
            <div className="bg-muted h-10 w-10 animate-pulse rounded-full" />
          </div>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex items-center gap-5">
              <div className="bg-muted h-20 w-20 animate-pulse rounded-2xl md:h-24 md:w-24" />
              <div className="space-y-2">
                <div className="bg-muted h-16 w-32 animate-pulse rounded-xl" />
                <div className="bg-muted h-5 w-28 animate-pulse rounded-md" />
              </div>
            </div>
            <div className="flex gap-8 md:ml-auto">
              <div className="bg-muted h-10 w-20 animate-pulse rounded-md" />
              <div className="bg-muted h-10 w-20 animate-pulse rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hourly strip */}
      <Card className="bg-card/90 border-border/50 shadow-sm backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="bg-muted mb-4 h-5 w-32 animate-pulse rounded-md" />
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-muted/40 h-32 min-w-[76px] flex-1 animate-pulse rounded-2xl" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily + chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card/90 border-border/50 shadow-sm backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="bg-muted mb-4 h-5 w-32 animate-pulse rounded-md" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-muted/40 h-10 animate-pulse rounded-xl" />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/90 border-border/50 shadow-sm backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="bg-muted mb-4 h-5 w-36 animate-pulse rounded-md" />
            <div className="bg-muted/40 h-36 animate-pulse rounded-xl" />
          </CardContent>
        </Card>
      </div>

      {/* Details */}
      <Card className="bg-card/90 border-border/50 shadow-sm backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="bg-muted mb-4 h-5 w-20 animate-pulse rounded-md" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="bg-muted/40 h-20 animate-pulse rounded-2xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

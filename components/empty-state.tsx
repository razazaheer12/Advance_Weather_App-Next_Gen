import type React from "react"
import { Cloud, Sun } from "lucide-react"
import { LogoMark } from "@/components/logo"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  children?: React.ReactNode
  className?: string
}

export function EmptyState({ children, className }: EmptyStateProps) {
  return (
    <section className={cn("animate-fade-in-up relative mx-auto flex max-w-lg flex-col items-center px-4 text-center", className)}>
      <Sun aria-hidden="true" className="text-amber-400/30 animate-float-slow absolute -top-4 right-8 h-12 w-12" />
      <Cloud aria-hidden="true" className="text-primary/20 animate-float-slow absolute -left-2 top-10 h-10 w-10" style={{ animationDelay: "2s" }} />

      <LogoMark className="text-primary mb-5 h-16 w-16" />
      <h2 className="text-foreground text-2xl font-semibold tracking-tight md:text-3xl">What&apos;s the weather like?</h2>
      <p className="text-muted-foreground mt-2 text-base">Search for a city to get started.</p>
      {children && <div className="mt-8 w-full">{children}</div>}
    </section>
  )
}

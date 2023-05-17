import { cn } from "~/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-full bg-slate-100", className)}
      {...props}
    />
  )
}

export { Skeleton }

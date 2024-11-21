import { cn } from "../../lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "noanimate-pulse norounded-md nobg-slate-100 dark:nobg-slate-800",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "noinline-flex noitems-center norounded-full noborder noborder-slate-200 nopx-2.5 nopy-0.5 notext-xs nofont-semibold notransition-colors focus:nooutline-none focus:noring-2 focus:noring-slate-950 focus:noring-offset-2 dark:noborder-slate-800 dark:focus:noring-slate-300",
  {
    variants: {
      variant: {
        default:
          "noborder-transparent nobg-slate-900 notext-slate-50 hover:nobg-slate-900/80 dark:nobg-slate-50 dark:notext-slate-900 dark:hover:nobg-slate-50/80",
        secondary:
          "noborder-transparent nobg-slate-100 notext-slate-900 hover:nobg-slate-100/80 dark:nobg-slate-800 dark:notext-slate-50 dark:hover:nobg-slate-800/80",
        destructive:
          "noborder-transparent nobg-red-500 notext-slate-50 hover:nobg-red-500/80 dark:nobg-red-900 dark:notext-slate-50 dark:hover:nobg-red-900/80",
        outline: "notext-slate-950 dark:notext-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

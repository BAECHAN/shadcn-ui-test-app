import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

const alertVariants = cva(
  "norelative now-full norounded-lg noborder noborder-slate-200 nop-4 [&>svg~*]:nopl-7 [&>svg+div]:notranslate-y-[-3px] [&>svg]:noabsolute [&>svg]:noleft-4 [&>svg]:notop-4 [&>svg]:notext-slate-950 dark:noborder-slate-800 dark:[&>svg]:notext-slate-50",
  {
    variants: {
      variant: {
        default:
          "nobg-white notext-slate-950 dark:nobg-slate-950 dark:notext-slate-50",
        destructive:
          "noborder-red-500/50 notext-red-500 dark:noborder-red-500 [&>svg]:notext-red-500 dark:noborder-red-900/50 dark:notext-red-900 dark:dark:noborder-red-900 dark:[&>svg]:notext-red-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "nomb-1 nofont-medium noleading-none notracking-tight",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("notext-sm [&_p]:noleading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

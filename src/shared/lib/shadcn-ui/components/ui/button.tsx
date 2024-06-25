import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export const buttonVariants = cva(
  "noinline-flex noitems-center nojustify-center nowhitespace-nowrap norounded-md notext-sm nofont-medium noring-offset-white notransition-colors focus-visible:nooutline-none focus-visible:noring-2 focus-visible:noring-slate-950 focus-visible:noring-offset-2 disabled:nopointer-events-none disabled:noopacity-50 dark:noring-offset-slate-950 dark:focus-visible:noring-slate-300",
  {
    variants: {
      variant: {
        default:
          "nobg-slate-900 notext-slate-50 hover:nobg-slate-900/90 dark:nobg-slate-50 dark:notext-slate-900 dark:hover:nobg-slate-50/90",
        destructive:
          "nobg-red-500 notext-slate-50 hover:nobg-red-500/90 dark:nobg-red-900 dark:notext-slate-50 dark:hover:nobg-red-900/90",
        outline:
          "noborder noborder-slate-200 nobg-white hover:nobg-slate-100 hover:notext-slate-900 dark:noborder-slate-800 dark:nobg-slate-950 dark:hover:nobg-slate-800 dark:hover:notext-slate-50",
        secondary:
          "nobg-slate-100 notext-slate-900 hover:nobg-slate-100/80 dark:nobg-slate-800 dark:notext-slate-50 dark:hover:nobg-slate-800/80",
        ghost:
          "hover:nobg-slate-100 hover:notext-slate-900 dark:hover:nobg-slate-800 dark:hover:notext-slate-50",
        link: "notext-slate-900 nounderline-offset-4 hover:nounderline dark:notext-slate-50",
      },
      size: {
        default: "noh-10 nopx-4 nopy-2",
        sm: "noh-9 norounded-md nopx-3",
        lg: "noh-11 norounded-md nopx-8",
        icon: "noh-10 now-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

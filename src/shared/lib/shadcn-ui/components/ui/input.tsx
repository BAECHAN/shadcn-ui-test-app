import * as React from "react";

import { cn } from "../../lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "noflex noh-10 now-full norounded-md noborder noborder-slate-200 nobg-white nopx-3 nopy-2 notext-base noring-offset-white file:noborder-0 file:nobg-transparent file:notext-sm file:nofont-medium file:notext-slate-950 placeholder:notext-slate-500 focus-visible:nooutline-none focus-visible:noring-2 focus-visible:noring-slate-950 focus-visible:noring-offset-2 disabled:nocursor-not-allowed disabled:noopacity-50 md:notext-sm dark:noborder-slate-800 dark:nobg-slate-950 dark:noring-offset-slate-950 dark:file:notext-slate-50 dark:placeholder:notext-slate-400 dark:focus-visible:noring-slate-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

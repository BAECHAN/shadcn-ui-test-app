import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/shared/lib/shadcn-ui/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "nopeer noh-4 now-4 noshrink-0 norounded-sm noborder noborder-slate-200 noborder-slate-900 noring-offset-white focus-visible:nooutline-none focus-visible:noring-2 focus-visible:noring-slate-950 focus-visible:noring-offset-2 disabled:nocursor-not-allowed disabled:noopacity-50 data-[state=checked]:nobg-slate-900 data-[state=checked]:notext-slate-50 dark:noborder-slate-800 dark:noborder-slate-50 dark:noring-offset-slate-950 dark:focus-visible:noring-slate-300 dark:data-[state=checked]:nobg-slate-50 dark:data-[state=checked]:notext-slate-900",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("noflex noitems-center nojustify-center notext-current")}
    >
      <Check className="noh-4 now-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "../../lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "noz-50 nooverflow-hidden norounded-md noborder noborder-slate-200 nobg-white nopx-3 nopy-1.5 notext-sm notext-slate-950 noshadow-md noanimate-in nofade-in-0 nozoom-in-95 data-[state=closed]:noanimate-out data-[state=closed]:nofade-out-0 data-[state=closed]:nozoom-out-95 data-[side=bottom]:noslide-in-from-top-2 data-[side=left]:noslide-in-from-right-2 data-[side=right]:noslide-in-from-left-2 data-[side=top]:noslide-in-from-bottom-2 dark:noborder-slate-800 dark:nobg-slate-950 dark:notext-slate-50",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

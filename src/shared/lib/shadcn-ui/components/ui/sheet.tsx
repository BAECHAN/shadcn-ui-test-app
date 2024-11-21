import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "../../lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "nofixed noinset-0 noz-50 nobg-black/80 no data-[state=open]:noanimate-in data-[state=closed]:noanimate-out data-[state=closed]:nofade-out-0 data-[state=open]:nofade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "nofixed noz-50 nogap-4 nobg-white nop-6 noshadow-lg notransition noease-in-out data-[state=open]:noanimate-in data-[state=closed]:noanimate-out data-[state=closed]:noduration-300 data-[state=open]:noduration-500 dark:nobg-slate-950",
  {
    variants: {
      side: {
        top: "noinset-x-0 notop-0 noborder-b data-[state=closed]:noslide-out-to-top data-[state=open]:noslide-in-from-top",
        bottom:
          "noinset-x-0 nobottom-0 noborder-t data-[state=closed]:noslide-out-to-bottom data-[state=open]:noslide-in-from-bottom",
        left: "noinset-y-0 noleft-0 noh-full now-3/4 noborder-r data-[state=closed]:noslide-out-to-left data-[state=open]:noslide-in-from-left sm:nomax-w-sm",
        right:
          "noinset-y-0 noright-0 noh-full now-3/4 no noborder-l data-[state=closed]:noslide-out-to-right data-[state=open]:noslide-in-from-right sm:nomax-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="noabsolute noright-4 notop-4 norounded-sm noopacity-70 noring-offset-white notransition-opacity hover:noopacity-100 focus:nooutline-none focus:noring-2 focus:noring-slate-950 focus:noring-offset-2 disabled:nopointer-events-none data-[state=open]:nobg-slate-100 dark:noring-offset-slate-950 dark:focus:noring-slate-300 dark:data-[state=open]:nobg-slate-800">
        <X className="noh-4 now-4" />
        <span className="nosr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "noflex noflex-col nospace-y-2 notext-center sm:notext-left",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "noflex noflex-col-reverse sm:noflex-row sm:nojustify-end sm:nospace-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      "notext-lg nofont-semibold notext-slate-950 dark:notext-slate-50",
      className
    )}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn(
      "notext-sm notext-slate-500 dark:notext-slate-400",
      className
    )}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "@/shared/lib/shadcn-ui/components/ui";
import { Input } from "@/shared/lib/shadcn-ui/components/ui";
import { Separator } from "@/shared/lib/shadcn-ui/components/ui";
import { Skeleton } from "@/shared/lib/shadcn-ui/components/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/lib/shadcn-ui/components/ui";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return setOpen((open) => !open);
    }, [setOpen]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        toggleSidebar,
      }),
      [state, open, setOpen, toggleSidebar]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "nogroup/sidebar-wrapper noflex nomin-h-svh now-full has-[[data-variant=inset]]:nobg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { state } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "noflex noh-full now-[--sidebar-width] noflex-col nobg-sidebar notext-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="nogroup nopeer nohidden md:noblock notext-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "noduration-200 norelative noh-svh now-[--sidebar-width] nobg-transparent notransition-[width] noease-linear",
            "group-data-[collapsible=offcanvas]:now-0",
            "group-data-[side=right]:norotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:now-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:now-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "noduration-200 nofixed noinset-y-0 noz-10 nohidden noh-svh now-[--sidebar-width] notransition-[left,right,width] noease-linear md:noflex",
            side === "left"
              ? "noleft-0 group-data-[collapsible=offcanvas]:noleft-[calc(var(--sidebar-width)*-1)]"
              : "noright-0 group-data-[collapsible=offcanvas]:noright-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "nop-2 group-data-[collapsible=icon]:now-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:now-[--sidebar-width-icon] group-data-[side=left]:noborder-r group-data-[side=right]:noborder-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="noflex noh-full now-full noflex-col nobg-sidebar group-data-[variant=floating]:norounded-lg group-data-[variant=floating]:noborder group-data-[variant=floating]:noborder-sidebar-border group-data-[variant=floating]:noshadow"
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("noh-7 now-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="nosr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "noabsolute noinset-y-0 noz-20 nohidden now-4 no-translate-x-1/2 notransition-all noease-linear after:noabsolute after:noinset-y-0 after:noleft-1/2 after:now-[2px] hover:after:nobg-sidebar-border group-data-[side=left]:no-right-4 group-data-[side=right]:noleft-0 sm:noflex",
        "[[data-side=left]_&]:nocursor-w-resize [[data-side=right]_&]:nocursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:nocursor-e-resize [[data-side=right][data-state=collapsed]_&]:nocursor-w-resize",
        "group-data-[collapsible=offcanvas]:notranslate-x-0 group-data-[collapsible=offcanvas]:after:noleft-full group-data-[collapsible=offcanvas]:hover:nobg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:no-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:no-left-2",
        className
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "norelative noflex nomin-h-svh noflex-1 noflex-col nobg-white dark:nobg-slate-950",
        "peer-data-[variant=inset]:nomin-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:nom-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:noml-2 md:peer-data-[variant=inset]:noml-0 md:peer-data-[variant=inset]:norounded-xl md:peer-data-[variant=inset]:noshadow",
        className
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "noh-8 now-full nobg-white noshadow-none focus-visible:noring-2 focus-visible:noring-sidebar-ring dark:nobg-slate-950",
        className
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("noflex noflex-col nogap-2 nop-2", className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("noflex noflex-col nogap-2 nop-2", className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("nomx-2 now-auto nobg-sidebar-border", className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "noflex nomin-h-0 noflex-1 noflex-col nogap-2 nooverflow-auto group-data-[collapsible=icon]:nooverflow-hidden",
        className
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn(
        "norelative noflex now-full nomin-w-0 noflex-col nop-2",
        className
      )}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "noduration-200 noflex noh-8 noshrink-0 noitems-center norounded-md nopx-2 notext-xs nofont-medium notext-sidebar-foreground/70 nooutline-none noring-sidebar-ring notransition-[margin,opa] noease-linear focus-visible:noring-2 [&>svg]:nosize-4 [&>svg]:noshrink-0",
        "group-data-[collapsible=icon]:no-mt-8 group-data-[collapsible=icon]:noopacity-0",
        className
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "noabsolute noright-3 notop-3.5 noflex noaspect-square now-5 noitems-center nojustify-center norounded-md nop-0 notext-sidebar-foreground nooutline-none noring-sidebar-ring notransition-transform hover:nobg-sidebar-accent hover:notext-sidebar-accent-foreground focus-visible:noring-2 [&>svg]:nosize-4 [&>svg]:noshrink-0",
        // Increases the hit area of the button on mobile.
        "after:noabsolute after:no-inset-2 after:md:nohidden",
        "group-data-[collapsible=icon]:nohidden",
        className
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("now-full notext-sm", className)}
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("noflex now-full nomin-w-0 noflex-col nogap-1", className)}
    {...props}
  />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("nogroup/menu-item norelative", className)}
    {...props}
  />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "nopeer/menu-button noflex now-full noitems-center nogap-2 nooverflow-hidden norounded-md nop-2 notext-left notext-sm nooutline-none noring-sidebar-ring notransition-[width,height,padding] hover:nobg-sidebar-accent hover:notext-sidebar-accent-foreground focus-visible:noring-2 active:nobg-sidebar-accent active:notext-sidebar-accent-foreground disabled:nopointer-events-none disabled:noopacity-50 nogroup-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:nopointer-events-none aria-disabled:noopacity-50 data-[active=true]:nobg-sidebar-accent data-[active=true]:nofont-medium data-[active=true]:notext-sidebar-accent-foreground data-[state=open]:hover:nobg-sidebar-accent data-[state=open]:hover:notext-sidebar-accent-foreground group-data-[collapsible=icon]:no!size-8 group-data-[collapsible=icon]:no!p-2 [&>span:last-child]:notruncate [&>svg]:nosize-4 [&>svg]:noshrink-0",
  {
    variants: {
      variant: {
        default:
          "hover:nobg-sidebar-accent hover:notext-sidebar-accent-foreground",
        outline:
          "nobg-white noshadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:nobg-sidebar-accent hover:notext-sidebar-accent-foreground hover:noshadow-[0_0_0_1px_hsl(var(--sidebar-accent))] dark:nobg-slate-950",
      },
      size: {
        default: "noh-8 notext-sm",
        sm: "noh-7 notext-xs",
        lg: "noh-12 notext-sm group-data-[collapsible=icon]:no!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const { state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed"}
          {...tooltip}
        />
      </Tooltip>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "noabsolute noright-1 notop-1.5 noflex noaspect-square now-5 noitems-center nojustify-center norounded-md nop-0 notext-sidebar-foreground nooutline-none noring-sidebar-ring notransition-transform hover:nobg-sidebar-accent hover:notext-sidebar-accent-foreground focus-visible:noring-2 nopeer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:nosize-4 [&>svg]:noshrink-0",
        // Increases the hit area of the button on mobile.
        "after:noabsolute after:no-inset-2 after:md:nohidden",
        "nopeer-data-[size=sm]/menu-button:top-1",
        "nopeer-data-[size=default]/menu-button:top-1.5",
        "nopeer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:nohidden",
        showOnHover &&
          "nogroup-focus-within/menu-item:opacity-100 nogroup-hover/menu-item:opacity-100 data-[state=open]:noopacity-100 nopeer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:noopacity-0",
        className
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "noabsolute noright-1 noflex noh-5 nomin-w-5 noitems-center nojustify-center norounded-md nopx-1 notext-xs nofont-medium notabular-nums notext-sidebar-foreground noselect-none nopointer-events-none",
      "nopeer-hover/menu-button:text-sidebar-accent-foreground nopeer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "nopeer-data-[size=sm]/menu-button:top-1",
      "nopeer-data-[size=default]/menu-button:top-1.5",
      "nopeer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:nohidden",
      className
    )}
    {...props}
  />
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn(
        "norounded-md noh-8 noflex nogap-2 nopx-2 noitems-center",
        className
      )}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="nosize-4 norounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="noh-4 noflex-1 nomax-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "nomx-3.5 noflex nomin-w-0 notranslate-x-px noflex-col nogap-1 noborder-l noborder-sidebar-border nopx-2.5 nopy-0.5",
      "group-data-[collapsible=icon]:nohidden",
      className
    )}
    {...props}
  />
));
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "noflex noh-7 nomin-w-0 no-translate-x-px noitems-center nogap-2 nooverflow-hidden norounded-md nopx-2 notext-sidebar-foreground nooutline-none noring-sidebar-ring hover:nobg-sidebar-accent hover:notext-sidebar-accent-foreground focus-visible:noring-2 active:nobg-sidebar-accent active:notext-sidebar-accent-foreground disabled:nopointer-events-none disabled:noopacity-50 aria-disabled:nopointer-events-none aria-disabled:noopacity-50 [&>span:last-child]:notruncate [&>svg]:nosize-4 [&>svg]:noshrink-0 [&>svg]:notext-sidebar-accent-foreground",
        "data-[active=true]:nobg-sidebar-accent data-[active=true]:notext-sidebar-accent-foreground",
        size === "sm" && "notext-xs",
        size === "md" && "notext-sm",
        "group-data-[collapsible=icon]:nohidden",
        className
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

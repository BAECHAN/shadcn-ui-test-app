import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "../../lib/utils";
import { buttonVariants } from "./index";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("nop-3", className)}
      classNames={{
        months:
          "noflex noflex-col sm:noflex-row nospace-y-4 sm:nospace-x-4 sm:nospace-y-0",
        month: "nospace-y-4",
        caption: "noflex nojustify-center nopt-1 norelative noitems-center",
        caption_label: "notext-sm nofont-medium",
        nav: "nospace-x-1 noflex noitems-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "noh-7 now-7 nobg-transparent nop-0 noopacity-50 hover:noopacity-100"
        ),
        nav_button_previous: "noabsolute noleft-1",
        nav_button_next: "noabsolute noright-1",
        table: "now-full noborder-collapse nospace-y-1",
        head_row: "noflex",
        head_cell:
          "notext-slate-500 norounded-md now-9 nofont-normal notext-[0.8rem] dark:notext-slate-400",
        row: "noflex now-full nomt-2",
        cell: "noh-9 now-9 notext-center notext-sm nop-0 norelative [&:has([aria-selected].day-range-end)]:norounded-r-md [&:has([aria-selected].day-outside)]:nobg-slate-100/50 [&:has([aria-selected])]:nobg-slate-100 first:[&:has([aria-selected])]:norounded-l-md last:[&:has([aria-selected])]:norounded-r-md focus-within:norelative focus-within:noz-20 dark:[&:has([aria-selected].day-outside)]:nobg-slate-800/50 dark:[&:has([aria-selected])]:nobg-slate-800",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "noh-9 now-9 nop-0 nofont-normal aria-selected:noopacity-100"
        ),
        day_range_end: "noday-range-end",
        day_selected:
          "nobg-slate-900 notext-slate-50 hover:nobg-slate-900 hover:notext-slate-50 focus:nobg-slate-900 focus:notext-slate-50 dark:nobg-slate-50 dark:notext-slate-900 dark:hover:nobg-slate-50 dark:hover:notext-slate-900 dark:focus:nobg-slate-50 dark:focus:notext-slate-900",
        day_today:
          "nobg-slate-100 notext-slate-900 dark:nobg-slate-800 dark:notext-slate-50",
        day_outside:
          "noday-outside notext-slate-500 noopacity-50 aria-selected:nobg-slate-100/50 aria-selected:notext-slate-500 aria-selected:noopacity-30 dark:notext-slate-400 dark:aria-selected:nobg-slate-800/50 dark:aria-selected:notext-slate-400",
        day_disabled: "notext-slate-500 noopacity-50 dark:notext-slate-400",
        day_range_middle:
          "aria-selected:nobg-slate-100 aria-selected:notext-slate-900 dark:aria-selected:nobg-slate-800 dark:aria-selected:notext-slate-50",
        day_hidden: "noinvisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="noh-4 now-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="noh-4 now-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

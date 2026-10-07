import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn/ui Button, sized and coloured for KB Legal. Hover changes colour
// only — no scaling or lifting.
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-sans text-[15px] font-medium no-underline transition-colors duration-300 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-primary bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground",
        outline:
          "border border-primary bg-transparent text-primary hover:bg-primary/5 hover:text-primary",
        secondary:
          "border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        ghost:
          "border border-transparent bg-transparent text-primary hover:bg-primary/5",
        link: "h-auto border-none bg-transparent px-0 text-primary underline underline-offset-4 hover:text-primary-hover",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

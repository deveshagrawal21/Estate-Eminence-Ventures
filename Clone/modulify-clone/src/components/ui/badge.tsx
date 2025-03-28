import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-modulify-blue focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-modulify-blue text-white hover:bg-modulify-blue-dark",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "text-gray-900 border border-gray-200 hover:bg-gray-100",
        success:
          "bg-green-500 text-white hover:bg-green-600",
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

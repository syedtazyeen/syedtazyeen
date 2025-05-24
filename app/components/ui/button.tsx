import { cn } from "~/lib/utils";

const base =
  "inline-flex items-center justify-center rounded-md text-sm cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline:
    "border border-border hover:border-foreground/10 bg-border/40 hover:bg-border hover:text-foreground",
  link: "underline-offset-4 hover:underline text-primary",
};

const sizes = {
  sm: "h-8 px-3",
  md: "h-8 px-2 py-1",
  lg: "h-11 px-8",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

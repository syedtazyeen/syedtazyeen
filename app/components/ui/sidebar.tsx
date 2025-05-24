interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ children, className = "", ...props }: SidebarProps) {
  return (
    <div
      className={`fixed left-0 bottom-0 w-full h-16 border-t border-border z-20
                  md:top-0 md:left-0 md:h-screen md:w-16 md:border-t-0 md:border-r
                  ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface SidebarInsetProps extends React.HTMLAttributes<HTMLElement> {}

export function SidebarInset({
  children,
  className = "",
  ...props
}: SidebarInsetProps) {
  return (
    <main
      className={`w-full h-[calc(100svh-4rem)] mb-16 md:mb-0 md:ml-16 md:w-[calc(100%-4rem)]
                  ${className}`}
      {...props}
    >
      {children}
    </main>
  );
}

import { ChevronRightIcon } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import fallbackImage from "~/assets/placeholder.jpg";
import { cn } from "~/lib/utils";

interface ExpItemProps extends React.HTMLAttributes<HTMLDivElement> {
  company: string;
  position: string;
  period: string;
  description: string;
  location: string;
  logo?: string;
}

export default function ExpItem(
  {
    company,
    position,
    period,
    description,
    location,
    logo,
    className,
    ...props
  }: ExpItemProps,
  key: number
) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState<number | null>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        const scrollHeight = contentRef.current.scrollHeight;
        setHeight(scrollHeight);
      } else {
        setHeight(0);
      }
    }
  }, [isOpen]);

  return (
    <div
      key={key}
      data-open={isOpen}
      onClick={handleClick}
      className={cn(
        "group bg-background hover:bg-muted/5 rounded-xl p-4 cursor-pointer transform transition-all select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
          <img
            src={logo || fallbackImage}
            alt={company}
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== window.location.origin + fallbackImage) {
                target.onerror = null;
                target.src = fallbackImage;
              }
            }}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{company}</h3>
            <ChevronRightIcon
              data-open={isOpen}
              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 data-[open=true]:rotate-90"
            />
          </div>
          <p className="text-sm text-muted-foreground">{position}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{period}</p>
          <p className="text-sm text-muted-foreground/60">{location}</p>
        </div>
      </div>

      <div
        ref={contentRef}
        style={{
          height: height !== null ? `${height}px` : 0,
          opacity: isOpen ? 1 : 0,
        }}
        className="transition-[height,opacity] duration-300 overflow-hidden text-sm text-muted-foreground/80"
      >
        <p className="pt-2 pl-14">{description}</p>
      </div>
    </div>
  );
}

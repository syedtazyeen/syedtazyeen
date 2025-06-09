import React from "react";

export default function PLink({
  text,
  href,
  children,
}: {
  text: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <span className="relative group inline-block select-none h-5">
      <span className="inline-block transform  duration-500 group-hover:scale-110">
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </span>
      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs px-2 text-xs text-background bg-muted rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
        {text}
      </span>
    </span>
  );
}

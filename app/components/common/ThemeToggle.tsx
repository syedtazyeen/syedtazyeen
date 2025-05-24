import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [isRotating, setIsRotating] = useState(false);

  const toggleTheme = () => {
    if (isRotating) return;

    setIsRotating(true);

    setTimeout(() => {
      setIsDark((prev) => !prev);

      if (isDark) {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      }

      setIsRotating(false);
    }, 250);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="group hover:bg-muted/10 p-1 size-8 rounded-full"
    >
      <div
        className={cn(
          "inline-block transition-transform duration-500 ease-in-out transform",
          isRotating ? "rotate-180" : "rotate-0"
        )}
      >
        {isDark ? (
          <MoonIcon className="stroke-1 text-muted-foreground" />
        ) : (
          <SunIcon className="stroke-1 text-muted-foreground" />
        )}
      </div>
    </button>
  );
}

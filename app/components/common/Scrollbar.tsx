import React, { useEffect, useState, useRef } from "react";

export default function Scrollbar() {
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const dragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartTop = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const TRACK_HEIGHT = 96; // 24px (h-24) in Tailwind

  const updateThumb = () => {
    const scrollTop = window.scrollY;
    const innerHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    const needsScrollbar = scrollHeight > innerHeight;
    setIsVisible(needsScrollbar);
    if (!needsScrollbar) return;

    const ratio = innerHeight / scrollHeight;
    const newThumbHeight = Math.max(ratio * TRACK_HEIGHT, 8); // min 8px
    const maxThumbTop = TRACK_HEIGHT - newThumbHeight;
    const scrollRatio =
      scrollHeight > innerHeight ? scrollTop / (scrollHeight - innerHeight) : 0;
    const newThumbTop = scrollRatio * maxThumbTop;

    setThumbHeight(newThumbHeight);
    setThumbTop(newThumbTop);
  };

  useEffect(() => {
    let animationFrameId: number;

    const handleScrollOrResize = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateThumb);
    };

    updateThumb();
    window.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    dragStartY.current = e.clientY;
    dragStartTop.current = thumbTop;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.userSelect = "none";
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    e.preventDefault();

    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const deltaY = e.clientY - dragStartY.current;

    const maxThumbTop = TRACK_HEIGHT - thumbHeight;
    let newThumbTop = dragStartTop.current + deltaY;
    newThumbTop = Math.max(0, Math.min(newThumbTop, maxThumbTop));

    const scrollRatio = maxThumbTop > 0 ? newThumbTop / maxThumbTop : 0;
    const newScrollTop = scrollRatio * (scrollHeight - innerHeight);

    window.scrollTo({ top: newScrollTop, behavior: "smooth" });
  };

  const onMouseUp = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.body.style.userSelect = "";
  };

  const onTrackClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;

      const clickY = e.clientY - rect.top;
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;

      const scrollRatio = clickY / TRACK_HEIGHT;
      const newScrollTop = scrollRatio * (scrollHeight - innerHeight);

      window.scrollTo({ top: newScrollTop, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={trackRef}
      className="fixed right-4 top-1/2 -translate-y-1/2 h-24 w-2 rounded-full bg-border overflow-hidden z-50 cursor-pointer select-none"
      onClick={onTrackClick}
    >
      <div
        className="absolute left-0 w-full bg-foreground/90 rounded-full hover:bg-foreground transition-colors cursor-grab active:cursor-grabbing"
        style={{
          height: `${thumbHeight}px`,
          transform: `translateY(${thumbTop}px)`,
          transition: dragging.current ? "none" : "transform 0.1s ease-out",
          borderRadius: "2px",
        }}
        onMouseDown={onMouseDown}
        aria-label="Page scroll thumb"
        role="scrollbar"
        tabIndex={0}
      />
    </div>
  );
}

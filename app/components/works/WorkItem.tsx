import { FolderCode, TvMinimalPlay } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import fallbackImage from "~/assets/placeholder.jpg";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

interface WorkItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  tech: string[];
  date?: string;
  imageUrl?: string;
  videoUrl?: string;
  link?: string;
  repository?: string;
}

export default function WorkItem(
  {
    title,
    description,
    imageUrl,
    videoUrl,
    tech,
    date,
    link,
    repository,
    className,
    ...props
  }: WorkItemProps,
  key: number
) {
  const [mediaError, setMediaError] = useState(false);

  const renderMedia = () => {
    if (videoUrl && !mediaError) {
      return (
        <video
          className="w-full h-48 object-cover rounded-t-xl"
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setMediaError(true)}
        />
      );
    }

    const srcToShow = mediaError || !imageUrl ? fallbackImage : imageUrl;

    return (
      <img
        className="w-full h-48 object-cover rounded-t-xl"
        src={srcToShow}
        onError={(e) => {
          if ((e.target as HTMLImageElement).src !== fallbackImage) {
            (e.target as HTMLImageElement).src = fallbackImage;
          }
        }}
        alt={title}
      />
    );
  };

  return (
    <div
      key={key}
      className={cn(
        "group flex flex-col border border-border rounded-xl min-h-80",
        className
      )}
      {...props}
    >
      <div>{renderMedia()}</div>
      <div className="flex-1 p-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm mt-1 opacity-60">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tech.map((t) => (
            <span key={t} className="text-xs bg-muted px-2 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 mt-4 flex justify-between items-center">
        {repository && (
          <Link to={repository}>
            <Button variant="outline" size="sm">
              <FolderCode className="mr-1 h-4 w-4" /> Code
            </Button>
          </Link>
        )}
        {link && (
          <Link to={link}>
            <Button variant="outline" size="sm">
              <TvMinimalPlay className="mr-1 h-4 w-4" /> Demo
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

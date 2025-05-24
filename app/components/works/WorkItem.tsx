import { Link } from "react-router";
import { FolderCode, TvMinimalPlay } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

interface WorkItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  tech: string[];
  date?: string;
  imageUrl?: string;
  link?: string;
  repository?: string;
}

const fallbackImage = "/placeholder.jpg";

export default function WorkItem(
  {
    title,
    description,
    imageUrl,
    tech,
    date,
    link,
    repository,
    className,
    ...props
  }: WorkItemProps,
  key: number
) {
  return (
    <div
      key={key}
      className={cn(
        "group p-2 flex flex-col md:flex-row gap-4 bg-background rounded-xl cursor-pointer select-none hover:bg-muted/5 transition-colors",
        className
      )}
      {...props}
    >
      <div className="w-full md:w-40 aspect-video md:aspect-square bg-border rounded-lg overflow-hidden">
        <img
          src={imageUrl || fallbackImage}
          alt={title}
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
      <div className="flex-1 gap-4 h-fit">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs font-light text-muted-foreground">{date}</p>
        </div>
        <p className="text-sm text-muted-foreground italic font-light">
          {tech.join(", ")}
        </p>
        <p className="pt-2 text-sm text-muted-foreground/60">{description}</p>
        <div className="flex items-center gap-2 pt-2">
          {link && (
            <Link to={link} target="_blank">
              <Button variant="outline">
                <TvMinimalPlay className="w-4 h-4 stroke-[1.25]" />
                <span className="text-xs ml-1">Live</span>
              </Button>
            </Link>
          )}
          {repository && (
            <Link to={repository} target="_blank">
              <Button variant="outline">
                <FolderCode className="w-4 h-4 stroke-[1.25]" />
                <span className="text-xs ml-1">Source code</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

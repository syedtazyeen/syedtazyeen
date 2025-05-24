import { WifiOff } from "lucide-react";

export default function AvailableChip() {
  const statusText = import.meta.env.VITE_PROFILE_STATUS ?? "AVAILABLE";
  const isAvailable = Boolean(statusText === "AVAILABLE");

  const style = {
    "--chip-color": isAvailable ? "#22c55e" : "#9ca3af", // green-500 or gray-400 hex
    "--chip-bg": isAvailable ? "rgba(34,197,94,0.1)" : "rgba(156,163,175,0.1)", // green-500/10 or gray-400/10
  };

  return (
    <div
      className="flex items-center gap-2 rounded-full border px-2 py-0.5"
      style={{
        ...style,
        borderColor: "var(--chip-color)",
        backgroundColor: "var(--chip-bg)",
      }}
    >
      {isAvailable ? (
        <div className="relative w-2.5 h-2.5">
          <div className="h-3 w-3 bg-green-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping z-0" />
          <div className="h-2 w-2 bg-green-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-10" />
        </div>
      ) : (
        <WifiOff className="w-3 h-3" />
      )}

      <p className="text-xs font-light" style={{ color: "var(--chip-color)" }}>
        {isAvailable
          ? statusText[0].toUpperCase() + statusText.slice(1).toLowerCase()
          : "Unavailable"}
      </p>
    </div>
  );
}

import { useEffect, useState } from "react";
import preloaderVideoPath from "@assets/preloader_1761649960015.mp4";

interface VideoPreloaderProps {
  onComplete: () => void;
}

export function VideoPreloader({ onComplete }: VideoPreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(220,15%,10%)]">
      <button
        onClick={() => {
          setIsVisible(false);
          onComplete();
        }}
        className="absolute top-4 right-4 z-10 px-4 py-2 bg-background/80 text-foreground rounded-md text-sm hover-elevate focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Skip preloader"
        data-testid="button-skip-preloader"
      >
        Skip
      </button>
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain"
          data-testid="video-preloader"
        >
          <source src={preloaderVideoPath} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

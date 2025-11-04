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

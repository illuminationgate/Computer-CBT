import { useEffect, useState, useRef } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  startTime: string; // ISO timestamp of when exam started
  duration: number; // Duration in minutes
  onTimeUp: () => void;
  isPaused?: boolean;
}

export function Timer({ startTime, duration, onTimeUp, isPaused = false }: TimerProps) {
  const onTimeUpRef = useRef(onTimeUp);
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const start = new Date(startTime).getTime();
    const now = Date.now();
    const elapsed = Math.floor((now - start) / 1000); // seconds elapsed
    const total = duration * 60; // total duration in seconds
    return Math.max(0, total - elapsed);
  });

  // Update ref when callback changes
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const start = new Date(startTime).getTime();
      const now = Date.now();
      const elapsed = Math.floor((now - start) / 1000);
      const total = duration * 60;
      const remaining = Math.max(0, total - elapsed);
      
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        onTimeUpRef.current();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration, isPaused]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Color transitions: normal → yellow at 5min → red at 2min
  const getColorClass = () => {
    if (timeRemaining <= 120) return "text-destructive"; // Red at 2 minutes
    if (timeRemaining <= 300) return "text-[hsl(38,95%,50%)]"; // Yellow at 5 minutes
    return "text-foreground";
  };

  const shouldPulse = timeRemaining <= 120;

  return (
    <div className="flex items-center gap-2" data-testid="timer-display">
      <Clock className={`h-5 w-5 ${getColorClass()}`} />
      <span
        className={`text-2xl md:text-3xl font-mono font-bold ${getColorClass()} ${
          shouldPulse ? "animate-pulse" : ""
        }`}
      >
        {formattedTime}
      </span>
    </div>
  );
}

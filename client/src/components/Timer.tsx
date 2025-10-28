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
  const [timeElapsed, setTimeElapsed] = useState(() => {
    const start = new Date(startTime).getTime();
    const now = Date.now();
    return Math.floor((now - start) / 1000); // seconds elapsed
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
      
      setTimeElapsed(elapsed);

      // Auto-submit when time is up
      if (elapsed >= total) {
        clearInterval(interval);
        onTimeUpRef.current();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration, isPaused]);

  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const totalSeconds = duration * 60;
  const timeRemaining = totalSeconds - timeElapsed;

  // Color transitions: normal → yellow at 5min remaining → red at 2min remaining
  const getColorClass = () => {
    if (timeRemaining <= 120) return "text-destructive"; // Red at 2 minutes remaining
    if (timeRemaining <= 300) return "text-[hsl(38,95%,50%)]"; // Yellow at 5 minutes remaining
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

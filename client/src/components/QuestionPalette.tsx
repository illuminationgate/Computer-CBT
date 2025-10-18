import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface QuestionPaletteProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: Set<number>;
  onQuestionSelect: (questionNumber: number) => void;
  onClose: () => void;
}

export function QuestionPalette({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onQuestionSelect,
  onClose,
}: QuestionPaletteProps) {
  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={onClose}>
      <div
        className="absolute bottom-0 left-0 right-0 bg-card border-t max-h-[70vh] rounded-t-2xl"
        onClick={(e) => e.stopPropagation()}
        data-testid="question-palette"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Question Navigator</h3>
          <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-palette">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="p-6">
          <div className="grid grid-cols-5 gap-2">
            {questions.map((num) => {
              const isAnswered = answeredQuestions.has(num);
              const isCurrent = num === currentQuestion;

              return (
                <button
                  key={num}
                  onClick={() => {
                    onQuestionSelect(num);
                    onClose();
                  }}
                  className={`
                    w-10 h-10 rounded-md text-sm font-medium transition-all
                    ${isCurrent ? "border-2 border-primary ring-2 ring-primary ring-offset-2" : "border border-border"}
                    ${isAnswered ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}
                    hover-elevate active-elevate-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  `}
                  aria-label={`Question ${num}${isAnswered ? ' (answered)' : ' (unanswered)'}${isCurrent ? ' (current)' : ''}`}
                  aria-current={isCurrent ? "true" : undefined}
                  data-testid={`palette-question-${num}`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </ScrollArea>

        <div className="p-4 border-t flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary"></div>
            <span className="text-muted-foreground">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-border bg-background"></div>
            <span className="text-muted-foreground">Unanswered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-primary bg-background"></div>
            <span className="text-muted-foreground">Current</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuestionPaletteDesktop({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onQuestionSelect,
}: Omit<QuestionPaletteProps, "onClose">) {
  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  return (
    <div className="hidden md:block bg-card border rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">Question Navigator</h3>
      
      <div className="grid grid-cols-10 gap-2 mb-4">
        {questions.map((num) => {
          const isAnswered = answeredQuestions.has(num);
          const isCurrent = num === currentQuestion;

          return (
            <button
              key={num}
              onClick={() => onQuestionSelect(num)}
              className={`
                w-10 h-10 rounded-md text-sm font-medium transition-all
                ${isCurrent ? "border-2 border-primary ring-2 ring-primary ring-offset-2" : "border border-border"}
                ${isAnswered ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}
                hover-elevate active-elevate-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              `}
              aria-label={`Question ${num}${isAnswered ? ' (answered)' : ' (unanswered)'}${isCurrent ? ' (current)' : ''}`}
              aria-current={isCurrent ? "true" : undefined}
              data-testid={`palette-question-${num}`}
            >
              {num}
            </button>
          );
        })}
      </div>

      <div className="space-y-2 text-xs pt-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary"></div>
          <span className="text-muted-foreground">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border border-border bg-background"></div>
          <span className="text-muted-foreground">Unanswered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-primary bg-background"></div>
          <span className="text-muted-foreground">Current</span>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Clock, FileText, Shield } from "lucide-react";

interface PreCheckModalProps {
  subjectName: string;
  duration: number;
  questionCount: number;
  onStart: () => void;
  onCancel: () => void;
}

export function PreCheckModal({
  subjectName,
  duration,
  questionCount,
  onStart,
  onCancel,
}: PreCheckModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full shadow-2xl p-8 space-y-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <AlertCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold" data-testid="text-modal-title">
              Ready to Begin?
            </h2>
            <p className="text-muted-foreground mt-1">
              Please review the exam details before starting
            </p>
          </div>
        </div>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Subject</p>
              <p className="font-medium" data-testid="text-subject-name">{subjectName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium" data-testid="text-duration">{duration} minutes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Total Questions</p>
              <p className="font-medium" data-testid="text-question-count">{questionCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Your answers will be automatically saved every 10 seconds. The exam will auto-submit when time runs out.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Avoid switching tabs or minimizing the window during the exam.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={onStart}
            className="flex-1"
            data-testid="button-confirm-start"
          >
            Start Exam
          </Button>
        </div>
      </Card>
    </div>
  );
}

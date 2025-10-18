import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, FileText, Clock, User, Award } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface ResultsData {
  studentName: string;
  gender: string;
  subjectName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number; // in seconds
}

export default function ResultsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [, setLocation] = useLocation();

  const { data: results, isLoading } = useQuery<ResultsData>({
    queryKey: ["/api/results", sessionId],
    enabled: !!sessionId,
  });

  if (isLoading || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  const minutes = Math.floor(results.timeTaken / 60);
  const seconds = results.timeTaken % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;

  const isPassing = results.percentage >= 50;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-3xl mx-auto space-y-8">
        {/* Hero section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className={`p-4 rounded-full ${isPassing ? "bg-[hsl(142,70%,45%)]/10" : "bg-muted"}`}>
              {isPassing ? (
                <CheckCircle2 className="h-16 w-16 text-[hsl(142,70%,45%)]" />
              ) : (
                <FileText className="h-16 w-16 text-muted-foreground" />
              )}
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-title">
            Exam Completed!
          </h1>
          
          <div className="space-y-2">
            <p className="text-6xl md:text-7xl font-bold text-primary" data-testid="text-score">
              {results.score}/{results.totalQuestions}
            </p>
            <p className="text-2xl md:text-3xl text-muted-foreground" data-testid="text-percentage">
              {results.percentage.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Details card */}
        <Card className={`shadow-lg p-8 border-2 ${isPassing ? "border-[hsl(142,70%,45%)]" : "border-border"}`}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Full Name</span>
              </div>
              <p className="text-lg font-semibold" data-testid="text-student-name">
                {results.studentName}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Gender</span>
              </div>
              <p className="text-lg font-semibold" data-testid="text-gender">
                {results.gender}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Subject</span>
              </div>
              <p className="text-lg font-semibold" data-testid="text-subject">
                {results.subjectName}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Time Taken</span>
              </div>
              <p className="text-lg font-semibold" data-testid="text-time-taken">
                {timeFormatted}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-4 w-4" />
                <span className="text-sm font-medium">Score</span>
              </div>
              <p className="text-lg font-semibold" data-testid="text-score-detail">
                {results.score} out of {results.totalQuestions}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-4 w-4" />
                <span className="text-sm font-medium">Percentage</span>
              </div>
              <p className="text-lg font-semibold" data-testid="text-percentage-detail">
                {results.percentage.toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>

        {/* Action buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setLocation("/")}
            data-testid="button-retake"
          >
            Retake Exam
          </Button>
          <Button
            size="lg"
            onClick={() => window.print()}
            data-testid="button-download"
          >
            Download Result
          </Button>
        </div>

        {/* Footer */}
        <footer className="text-center pt-8">
          <p className="text-sm text-muted-foreground">
            Thank you for using ComputCBT
          </p>
        </footer>
      </div>
    </div>
  );
}

import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timer } from "@/components/Timer";
import { QuestionPalette, QuestionPaletteDesktop } from "@/components/QuestionPalette";
import { PreCheckModal } from "@/components/PreCheckModal";
import { ChevronLeft, ChevronRight, Grid3x3, WifiOff, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Question {
  id: string;
  questionNumber: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface ExamSession {
  id: string;
  subjectId: string;
  subjectName: string;
  duration: number;
  totalQuestions: number;
  startTime: string | null;
  status: string;
}

export default function ExamInterface() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<string, string>>(new Map());
  const [showPalette, setShowPalette] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  // Fetch exam session
  const { data: session, isLoading: sessionLoading } = useQuery<ExamSession>({
    queryKey: ["/api/exam-session", sessionId],
    enabled: !!sessionId,
  });

  // Determine if we should show pre-check modal based on session status
  const showPreCheck = session && !session.startTime && session.status === "pending";
  const examStarted = session && (session.startTime !== null || session.status !== "pending");

  // Fetch questions
  const { data: questions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions", session?.subjectId],
    enabled: !!session?.subjectId && examStarted,
  });

  // Autosave mutation
  const saveMutation = useMutation({
    mutationFn: async (data: { questionId: string; selectedOption: string | null }) => {
      return await apiRequest("POST", `/api/save-answer/${sessionId}`, data);
    },
  });

  // Submit exam mutation
  const submitMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/submit-exam/${sessionId}`, {});
    },
    onSuccess: (data) => {
      setLocation(`/results/${sessionId}`);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Failed to submit exam. Please try again.",
      });
    },
  });

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Tab switch detection
  useEffect(() => {
    if (!examStarted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => {
          const newCount = prev + 1;
          if (newCount <= 3) {
            toast({
              variant: "destructive",
              title: "Warning",
              description: `Tab switch detected (${newCount}/3). Excessive switching may result in exam termination.`,
            });
          }
          return newCount;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [examStarted, toast]);

  // Autosave every 10 seconds
  useEffect(() => {
    if (!examStarted || !questions) return;

    const interval = setInterval(() => {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion) {
        const answer = selectedAnswers.get(currentQuestion.id);
        saveMutation.mutate({
          questionId: currentQuestion.id,
          selectedOption: answer || null,
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [examStarted, currentQuestionIndex, selectedAnswers, questions]);

  // Save answer when moving to next/previous question
  const saveCurrentAnswer = useCallback(() => {
    if (!questions) return;
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      const answer = selectedAnswers.get(currentQuestion.id);
      saveMutation.mutate({
        questionId: currentQuestion.id,
        selectedOption: answer || null,
      });
    }
  }, [questions, currentQuestionIndex, selectedAnswers, saveMutation]);

  const handleAnswerSelect = (option: string) => {
    if (!questions) return;
    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswers((prev) => new Map(prev).set(currentQuestion.id, option));
  };

  const handleNext = () => {
    if (!questions || currentQuestionIndex >= questions.length - 1) return;
    saveCurrentAnswer();
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex <= 0) return;
    saveCurrentAnswer();
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleQuestionSelect = (questionNumber: number) => {
    saveCurrentAnswer();
    setCurrentQuestionIndex(questionNumber - 1);
  };

  const handleTimeUp = () => {
    toast({
      title: "Time's Up!",
      description: "Submitting your exam...",
    });
    submitMutation.mutate();
  };

  const handleSubmit = () => {
    const unanswered = questions ? questions.length - selectedAnswers.size : 0;
    if (unanswered > 0) {
      const confirmed = window.confirm(
        `You have ${unanswered} unanswered question(s). Are you sure you want to submit?`
      );
      if (!confirmed) return;
    }
    submitMutation.mutate();
  };

  const startSessionMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/exam-session/${sessionId}/start`, {});
    },
    onSuccess: () => {
      // Invalidate the session query to get the updated startTime
      queryClient.invalidateQueries({ queryKey: ["/api/exam-session", sessionId] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to start exam. Please try again.",
      });
    },
  });

  const handleStartExam = () => {
    // Only start if session is pending
    if (session?.status === "pending") {
      startSessionMutation.mutate();
    }
  };

  const handleCancelExam = () => {
    setLocation("/");
  };

  if (sessionLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading exam...</p>
        </div>
      </div>
    );
  }

  if (showPreCheck) {
    return (
      <PreCheckModal
        subjectName={session.subjectName}
        duration={session.duration}
        questionCount={session.totalQuestions}
        onStart={handleStartExam}
        onCancel={handleCancelExam}
      />
    );
  }

  if (questionsLoading || !questions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answeredQuestions = new Set(
    questions
      .filter((q) => selectedAnswers.has(q.id))
      .map((q) => q.questionNumber)
  );

  // Show loading if we're waiting for the session to start
  if (examStarted && !session.startTime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Starting exam...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-card border-b h-16 px-4 md:px-6 flex items-center justify-between shadow-sm">
        {session.startTime && <Timer startTime={session.startTime} duration={session.duration} onTimeUp={handleTimeUp} />}
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium hidden md:inline" data-testid="text-question-counter">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium md:hidden" data-testid="text-question-counter-mobile">
            {currentQuestionIndex + 1}/{questions.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowPalette(true)}
            className="md:hidden"
            data-testid="button-show-palette"
          >
            <Grid3x3 className="h-5 w-5" />
          </Button>
        </div>

        <span className="text-sm font-medium" data-testid="text-subject">
          {session.subjectName}
        </span>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(answeredQuestions.size / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Warning banners */}
      {!isOnline && (
        <div className="bg-[hsl(38,95%,50%)] text-white px-4 py-2 flex items-center gap-2">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">
            You are offline. Answers will be saved locally and synced when connection is restored.
          </span>
        </div>
      )}

      {tabSwitchCount > 0 && (
        <div className="bg-destructive/10 text-destructive px-4 py-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-medium">
            Tab switches detected: {tabSwitchCount}. Please keep the exam window focused.
          </span>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
          <div className="grid md:grid-cols-[1fr,300px] gap-6">
            {/* Question area */}
            <div className="space-y-6">
              {/* Question card */}
              <Card className="shadow-md p-6 md:p-8">
                <div className="space-y-6">
                  <Badge variant="secondary" className="mb-2" data-testid="badge-question-number">
                    Question {currentQuestion.questionNumber} of {questions.length}
                  </Badge>
                  
                  <h2 className="text-lg md:text-xl leading-relaxed" data-testid="text-question">
                    {currentQuestion.questionText}
                  </h2>

                  <div className="space-y-4">
                    {["A", "B", "C", "D"].map((option) => {
                      const optionText = currentQuestion[`option${option}` as keyof Question] as string;
                      const isSelected = selectedAnswers.get(currentQuestion.id) === option;

                      return (
                        <label
                          key={option}
                          className={`
                            flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all
                            ${isSelected ? "border-primary bg-primary/5" : "border-border bg-card"}
                            hover:border-primary hover-elevate
                          `}
                          data-testid={`option-${option}`}
                        >
                          <input
                            type="radio"
                            name="answer"
                            value={option}
                            checked={isSelected}
                            onChange={() => handleAnswerSelect(option)}
                            className="mt-1 w-5 h-5 text-primary focus:ring-primary"
                          />
                          <span className="text-base md:text-lg flex-1">
                            <span className="font-medium mr-2">{option}.</span>
                            {optionText}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* Navigation */}
              <div className="flex gap-3 justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="min-w-32"
                  data-testid="button-previous"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {saveMutation.isPending && (
                    <Badge variant="secondary" className="text-xs">
                      Saving...
                    </Badge>
                  )}
                  {!isOnline && (
                    <Badge variant="secondary" className="text-xs">
                      Offline
                    </Badge>
                  )}
                </div>

                {currentQuestionIndex === questions.length - 1 ? (
                  <Button
                    variant="destructive"
                    onClick={handleSubmit}
                    disabled={submitMutation.isPending}
                    className="min-w-32"
                    data-testid="button-submit-exam"
                  >
                    {submitMutation.isPending ? "Submitting..." : "Submit Exam"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="min-w-32"
                    data-testid="button-next"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Question palette (desktop) */}
            <div className="hidden md:block">
              <QuestionPaletteDesktop
                totalQuestions={questions.length}
                currentQuestion={currentQuestionIndex + 1}
                answeredQuestions={answeredQuestions}
                onQuestionSelect={handleQuestionSelect}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Question palette (mobile) */}
      {showPalette && (
        <QuestionPalette
          totalQuestions={questions.length}
          currentQuestion={currentQuestionIndex + 1}
          answeredQuestions={answeredQuestions}
          onQuestionSelect={handleQuestionSelect}
          onClose={() => setShowPalette(false)}
        />
      )}
    </div>
  );
}

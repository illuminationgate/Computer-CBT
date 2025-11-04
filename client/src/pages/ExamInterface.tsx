import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Timer } from "@/components/Timer";
import { PreCheckModal } from "@/components/PreCheckModal";
import { ChevronLeft, ChevronRight, WifiOff, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import logoPath from "@assets/logo_1761650011103.png";

interface Question {
  id: string;
  questionNumber: number;
  questionText: string;
  instruction?: string | null;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE?: string | null;
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

  // Fetch questions (shuffled deterministically for this session)
  const { data: questions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions/session", sessionId],
    enabled: !!sessionId && examStarted,
  });

  // Fetch saved answers for session recovery
  const { data: savedAnswers } = useQuery<Record<string, string>>({
    queryKey: ["/api/answers", sessionId],
    enabled: !!sessionId && examStarted,
  });

  // Load saved answers into state when they're fetched (only once)
  const [answersLoaded, setAnswersLoaded] = useState(false);
  
  useEffect(() => {
    if (savedAnswers && Object.keys(savedAnswers).length > 0 && !answersLoaded) {
      const answersMap = new Map<string, string>();
      Object.entries(savedAnswers).forEach(([questionId, selectedOption]) => {
        answersMap.set(questionId, selectedOption);
      });
      setSelectedAnswers(answersMap);
      setAnswersLoaded(true);
    }
  }, [savedAnswers, answersLoaded]);

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
            setTimeout(() => {
              toast({
                variant: "destructive",
                title: "Warning",
                description: `Tab switch detected (${newCount}/3). Excessive switching may result in exam termination.`,
              });
            }, 0);
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
    // Only autosave if exam has actually started (has startTime) and questions are loaded
    if (!session?.startTime || !questions || questions.length === 0) return;

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
  }, [session?.startTime, currentQuestionIndex, selectedAnswers, questions, saveMutation]);

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
    
    // Immediately save the answer to backend for session recovery
    saveMutation.mutate({
      questionId: currentQuestion.id,
      selectedOption: option,
    });
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
    onSuccess: async () => {
      // Invalidate and refetch the session query to get the updated startTime
      await queryClient.invalidateQueries({ queryKey: ["/api/exam-session", sessionId] });
      // Force an immediate refetch to ensure UI updates
      await queryClient.refetchQueries({ queryKey: ["/api/exam-session", sessionId] });
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

  // Show loading if we're waiting for the session mutation to complete
  if (startSessionMutation.isPending) {
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
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <img 
            src={logoPath} 
            alt="ComputCBT" 
            className="h-8 md:h-10 w-auto flex-shrink-0"
            data-testid="img-logo"
          />
          <span className="text-xs md:text-sm font-medium truncate" data-testid="text-subject">
            {session.subjectName}
          </span>
        </div>

        {session.startTime && <Timer startTime={session.startTime} duration={session.duration} onTimeUp={handleTimeUp} />}
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium" data-testid="text-question-counter">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
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
      <main className="flex-1 overflow-y-auto pb-4">
        <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
          {/* Question card */}
          <Card className="shadow-md">
            <CardContent className="p-6 md:p-8 space-y-6">
              <Badge variant="secondary" className="mb-2" data-testid="badge-question-number">
                Question {currentQuestion.questionNumber} of {questions.length}
              </Badge>
              
              {/* Display instruction if present */}
              {currentQuestion.instruction && (
                <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary mb-4" data-testid="text-instruction">
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap text-muted-foreground italic">
                    {currentQuestion.instruction}
                  </p>
                </div>
              )}
              
              <h2 className="text-lg md:text-xl leading-relaxed" data-testid="text-question">
                {currentQuestion.questionText}
              </h2>

              <div className="space-y-4">
                {["A", "B", "C", "D", "E"].map((option) => {
                  const optionText = currentQuestion[`option${option}` as keyof Question] as string | null | undefined;
                  
                  // Skip option E if it doesn't exist
                  if (!optionText) return null;
                  
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

              {/* Previous/Submit/Next Buttons */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-center gap-2">
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

                <div className="flex items-center justify-between gap-3">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="flex-1 min-w-0"
                    data-testid="button-previous"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={handleSubmit}
                    disabled={submitMutation.isPending}
                    className="flex-1 min-w-0"
                    data-testid="button-submit-exam"
                  >
                    {submitMutation.isPending ? "Submitting..." : "Submit Exam"}
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="flex-1 min-w-0"
                    data-testid="button-next"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Question Navigator Grid */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-muted-foreground" data-testid="text-attempted-count">
                    Attempted {answeredQuestions.size}/{questions.length}
                  </p>
                </div>
                
                <div className="grid grid-cols-10 md:grid-cols-[repeat(20,minmax(0,1fr))] gap-1.5 md:gap-2" data-testid="question-navigator-grid">
                  {questions.map((q) => {
                    const isAnswered = answeredQuestions.has(q.questionNumber);
                    const isCurrent = q.questionNumber === currentQuestionIndex + 1;

                    return (
                      <button
                        key={q.id}
                        onClick={() => handleQuestionSelect(q.questionNumber)}
                        className={`
                          h-11 md:h-12 rounded text-xs md:text-sm font-medium transition-all
                          ${isCurrent ? "border-2 border-primary ring-2 ring-primary ring-offset-1" : "border border-border"}
                          ${isAnswered ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}
                          hover-elevate active-elevate-2 focus:outline-none focus:ring-2 focus:ring-primary
                        `}
                        aria-label={`Question ${q.questionNumber}${isAnswered ? ' (answered)' : ' (unanswered)'}${isCurrent ? ' (current)' : ''}`}
                        aria-current={isCurrent ? "true" : undefined}
                        data-testid={`navigator-question-${q.questionNumber}`}
                      >
                        {q.questionNumber}
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

    </div>
  );
}

import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { VideoPreloader } from "@/components/VideoPreloader";
import { useState } from "react";

// Existing pages
import LandingPage from "@/pages/LandingPage";
import ExamInterface from "@/pages/ExamInterface";
import ResultsPage from "@/pages/ResultsPage";

// Newly added pages
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsPage from "@/pages/TermsPage";

function Router() {
  return (
    <Switch>
      {/* Main pages */}
      <Route path="/" component={LandingPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy" component={PrivacyPolicyPage} />
      <Route path="/terms" component={TermsPage} />

      {/* Exam-related pages */}
      <Route path="/exam/:sessionId" component={ExamInterface} />
      <Route path="/results/:sessionId" component={ResultsPage} />

      {/* 404 fallback */}
      <Route>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-muted-foreground">Page not found</p>
            <a href="/" className="text-primary hover:underline">
              Return to home
            </a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

export default function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          {!preloaderComplete && (
            <VideoPreloader onComplete={() => setPreloaderComplete(true)} />
          )}

          {preloaderComplete && <Router />}

          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

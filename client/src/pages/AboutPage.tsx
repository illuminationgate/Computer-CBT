import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoPath from "@assets/logo_1761650011103.png";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex flex-col items-center justify-start p-6 relative">
      {/* Header */}
      <header className="absolute top-4 left-4 flex gap-4 text-sm font-medium">
        <a href="/" className="hover:underline">Home</a>
        <a href="/about" className="hover:underline">About</a>
        <a href="/contact" className="hover:underline">Contact</a>
      </header>

      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Content */}
      <div className="w-full max-w-2xl mx-auto space-y-6 mt-20">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <img 
              src={logoPath} 
              alt="ComputCBT Logo" 
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-foreground">About ComputCBT</h1>
          <p className="text-muted-foreground text-base">Learn more about who we are and what we do</p>
        </div>

        <Card className="p-8 shadow-lg border space-y-6 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p>
              computcbt.com.ng is a free and easy-to-use online CBT practice platform designed to help
              students prepare effectively for WAEC, NECO, UTME, NCEE, BECE, and school examinations.
            </p>
            <p className="mt-2">Our goal is simple: To give every student access to quality practice questions anytime, anywhere.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Who We Are</h2>
            <p>
              We are an educational technology platform focused on creating reliable CBT practice tests,
              real WAEC/NECO-style questions, instant marking and feedback, and friendly learning tools
              for both students and teachers.
            </p>
            <p className="mt-2">
              We believe that every student should have equal access to exam-standard materials without
              paying expensive fees.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">What We Offer</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>About 20 subjects covering WAEC & NECO questions</li>
              <li>Real CBT environment to simulate actual exams</li>
              <li>Instant results with automatic marking</li>
              <li>Mobile-friendly practice on any device</li>
              <li>Completely free access — no payment required</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p>
              To improve academic performance nationwide by providing a free and accessible platform
              where students can practice and strengthen their exam skills.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p>
              To become Nigeria’s leading online CBT practice hub for secondary school students and exam
              candidates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Who We Serve</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>WAEC/NECO candidates</li>
              <li>UTME students</li>
              <li>Secondary school learners</li>
              <li>Teachers preparing students for exams</li>
              <li>Schools needing free practice tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Why Choose computcbt.com.ng?</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fast, simple, and effective</li>
              <li>Uses real exam-style questions</li>
              <li>Builds student confidence</li>
              <li>Works on any device</li>
              <li>100% free — no charges at all</li>
            </ul>
          </section>
        </Card>

        {/* Footer */}
        <footer className="text-center pt-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ComputCBT. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

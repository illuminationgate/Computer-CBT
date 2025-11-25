import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoPath from "@assets/logo_1761650011103.png";

export default function TermsPage() {
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
      <div className="w-full max-w-3xl mx-auto space-y-6 mt-20">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <img
              src={logoPath}
              alt="ComputCBT Logo"
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Terms & Conditions</h1>
          <p className="text-muted-foreground text-base">Please read these terms carefully before using our platform</p>
        </div>

        <Card className="p-8 shadow-lg border space-y-6 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using ComputCBT (computcbt.com.ng), you agree to follow and be bound by these
              Terms & Conditions. If you do not agree, please discontinue use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Platform Purpose</h2>
            <p>
              ComputCBT is designed to help students across Nigeria and West Africa practice WAEC, NECO, UTME,
              NCEE, BECE, and school-based CBT examinations. The platform provides practice questions, instant
              marking, and a CBT-style test environment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Use of the Website</h2>
            <p>You agree to use ComputCBT responsibly and for educational purposes only.</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>You must not attempt to hack, modify, or disrupt the platform.</li>
              <li>You must not upload harmful content or malware.</li>
              <li>You may not use the website for fraudulent or illegal activity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Educational Content Disclaimer</h2>
            <p>
              While we strive to ensure accuracy, ComputCBT does not guarantee that all practice questions,
              explanations, or exam formats perfectly match WAEC, NECO, or UTME standards. The platform is for
              practice only and should not replace official study materials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. User Information</h2>
            <p>
              We collect minimal personal information such as your name and gender to personalize your experience.
              For more details, please review our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. CBT Performance Data</h2>
            <p>
              Your test attempts, scores, and performance trends may be stored to help improve your learning
              experience. This data does not identify your real-world identity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Advertisements</h2>
            <p>
              ComputCBT displays ads from Google AdSense and other partners. Advertisements help keep the service
              free for Nigerian and West African students.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. No Payments</h2>
            <p>
              ComputCBT is completely free. We do not request, process, or store payment information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Intellectual Property</h2>
            <p>
              All platform content — including UI, design, questions, and materials — remains the property of
              ComputCBT and may not be reproduced without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. External Links</h2>
            <p>
              ComputCBT may include links to third‑party websites. We are not responsible for the content or
              policies of these external sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">11. Limitation of Liability</h2>
            <p>
              ComputCBT is provided "as is" without warranties. We are not liable for exam outcomes, data loss,
              downtime, or damages arising from use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">12. Termination of Access</h2>
            <p>
              We reserve the right to restrict or block access for misuse, abuse, or violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">13. Updates to Terms</h2>
            <p>
              These Terms & Conditions may be updated occasionally. Continued use of the platform means that you
              accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">14. Contact Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email: computcbt@gmail.com</li>
              <li>WhatsApp: +234 906 623 8821</li>
              <li>Website: computcbt.com.ng</li>
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

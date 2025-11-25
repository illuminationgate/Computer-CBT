import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoPath from "@assets/logo_1761650011103.png";

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground text-base">How we collect, use, and protect your data</p>
        </div>

        <Card className="p-8 shadow-lg border space-y-6 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">Effective Date: 18th November 2025</h2>
            <p>
              Welcome to ComputCBT (computcbt.com.ng). Your privacy is important to us. This Privacy
              Policy explains how we collect, use, store, protect, and disclose your information when
              you use our website and CBT services. By accessing or using our platform, you agree to the
              terms in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">1. About the Website</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Platform: Website</li>
              <li>Website Name: ComputCBT</li>
              <li>Website URL: https://computcbt.com.ng</li>
              <li>Country of Operation: Nigeria</li>
              <li>Purpose: Providing CBT-style practice tests for WAEC, NECO, UTME, NCEE, and more</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
            <p>We collect information to improve your experience and ensure proper functioning of the platform.</p>

            <h3 className="font-semibold mt-4 mb-1">a. Personal Information</h3>
            <p>We may collect: Name, Gender.</p>
            <p className="mt-1">Note: The website does not send newsletters or promotional emails.</p>

            <h3 className="font-semibold mt-4 mb-1">b. Usage Data</h3>
            <p>Automatically collected when you use the website:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pages visited</li>
              <li>Time spent on the website</li>
              <li>IP address</li>
              <li>Browser and device type</li>
              <li>Server logs</li>
              <li>Analytics tracking data</li>
            </ul>

            <h3 className="font-semibold mt-4 mb-1">c. Student CBT Data</h3>
            <p>Your CBT practice generates data like subjects attempted, scores, test attempts, and accuracy rates.
            This data does not identify your real-world identity.</p>

            <h3 className="font-semibold mt-4 mb-1">d. Cookies & Tracking Technologies</h3>
            <p>We use standard cookies, analytics cookies, advertising cookies, and Google AdSense cookies.</p>
            <p className="mt-1">Cookies help enhance website functionality, track behavior, and show relevant ads.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide and improve CBT features</li>
              <li>Personalize user experience</li>
              <li>Monitor website performance</li>
              <li>Display relevant ads</li>
              <li>Respond to inquiries</li>
              <li>Prevent fraud or misuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Advertisements & Retargeting</h2>
            <p>We display adverts from Google AdSense and affiliate networks. Advertisers may use cookies to show
            personalized or retargeted ads.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Third‑Party Services</h2>
            <p>
              We use Google Analytics, Google AdSense, and other analytics tools. These third parties operate under
              their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Data Protection & Security</h2>
            <p>
              We take reasonable steps to secure your information — including safe servers and restricted access —
              but no online system is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Children’s Privacy</h2>
            <p>
              ComputCBT is designed for students, including those under 13. We do not knowingly collect personal
              data from children under 13 without consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. No Online Payments</h2>
            <p>We do not handle online payments or collect payment card information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. External Links</h2>
            <p>We may include links to external sites. We are not responsible for their content or policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Compliance With Global Privacy Laws</h2>
            <p>We comply with GDPR, CCPA, CalOPPA, and similar privacy laws.</p>
            <p className="mt-1">Your rights may include: accessing data, requesting correction or deletion, or asking us to stop processing your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">11. Changes to This Policy</h2>
            <p>The Privacy Policy may be updated periodically. The latest version will always be available on this page.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">12. Contact Us</h2>
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

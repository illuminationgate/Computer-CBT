import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoPath from "@assets/logo_1761650011103.png";

export default function ContactPage() {
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
      <div className="w-full max-w-md mx-auto space-y-6 mt-20">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <img
              src={logoPath}
              alt="ComputCBT Logo"
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
          <p className="text-muted-foreground text-base">We’d love to hear from you</p>
        </div>

        <Card className="p-8 shadow-lg border space-y-6 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
            <p>If you have questions, suggestions, or need help, reach out to us using the details below:</p>
          </section>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">Email:</span> computcbt@gmail.com
            </li>
            <li>
              <span className="font-semibold">WhatsApp:</span> +234 906 623 8821
            </li>
            <li>
              <span className="font-semibold">Website:</span> computcbt.com.ng
            </li>
          </ul>
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


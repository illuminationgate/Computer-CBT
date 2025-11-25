import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import logoPath from "@assets/logo_1761650011103.png";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  gender: z.enum(["Male", "Female"], { required_error: "Please select a gender" }),
  subject: z.string().min(1, "Please choose a subject"),
});

type FormValues = z.infer<typeof formSchema>;

const subjects = [
  "Agriculture",
  "Biology",
  "Chemistry",
  "Christian Religious Studies",
  "Civic Education",
  "Commerce",
  "Computer Studies",
  "Economics",
  "English Language",
  "Financial Accounting",
  "Geography",
  "Government",
  "History",
  "Islamic Studies",
  "Literature in English",
  "Mathematics",
  "Office Practice",
  "Physical Education",
  "Physics",
].sort();

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: undefined,
      subject: "",
    },
  });

  const startExamMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/start-exam", data);
      return response.json();
    },
    onSuccess: (data: any) => {
      setLocation(`/exam/${data.examSessionId}`);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to start exam. Please try again.",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    startExamMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex flex-col items-center justify-center p-4 relative">
      <header className="absolute top-4 left-4 flex gap-4 text-sm font-medium">
        <a href="/" className="hover:underline">Home</a>
        <a href="/about" className="hover:underline">About</a>
        <a href="/contact" className="hover:underline">Contact</a>
      </header>

      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src={logoPath} 
              alt="ComputCBT Logo" 
              className="h-24 w-auto"
              data-testid="img-logo"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-title">
            ComputCBT
          </h1>
          <p className="text-base text-muted-foreground" data-testid="text-tagline">
            Professional Computer-Based Testing
          </p>
        </div>

        <Card className="shadow-lg p-8 md:p-12 border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your full name"
                        className="h-12 text-base"
                        data-testid="input-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base transition-colors" data-testid="select-gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male" className="cursor-pointer">Male</SelectItem>
                        <SelectItem value="Female" className="cursor-pointer">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Subject</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base transition-colors" data-testid="select-subject">
                          <SelectValue placeholder="Choose your subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject} className="cursor-pointer">
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold"
                disabled={startExamMutation.isPending}
                data-testid="button-start-exam"
              >
                {startExamMutation.isPending ? "Starting Exam..." : "Start Exam"}
              </Button>
            </form>
          </Form>
        </Card>

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

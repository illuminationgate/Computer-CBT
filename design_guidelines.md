# ComputCBT Platform - Design Guidelines

## Design Approach

**Selected Approach:** Design System - Clean Minimal Education UI

This CBT platform requires a distraction-free, highly functional interface optimized for focus and clarity during high-stakes examinations. The design prioritizes accessibility, readability, and stress-reduction through calm, professional aesthetics.

**Key Principles:**
- Absolute clarity and zero visual noise during exams
- High contrast for extended reading sessions
- Calming, stress-reducing color palette
- Maximum accessibility for diverse users
- Professional credibility and trustworthiness

---

## Core Design Elements

### A. Color Palette

**Light Mode:**
- **Primary Brand:** 220 70% 50% (Deep Blue - trust, education, professionalism)
- **Primary Hover:** 220 70% 45%
- **Success:** 142 70% 45% (Correct answers, completion)
- **Warning:** 38 95% 50% (Timer warnings)
- **Danger:** 0 70% 50% (Auto-submit, critical alerts)
- **Background:** 0 0% 98% (Soft white - reduces eye strain)
- **Surface:** 0 0% 100% (Pure white cards/modals)
- **Text Primary:** 220 15% 20% (Near-black with blue undertone)
- **Text Secondary:** 220 10% 45%
- **Border:** 220 15% 88%

**Dark Mode:**
- **Primary Brand:** 220 70% 55%
- **Primary Hover:** 220 70% 60%
- **Success:** 142 60% 50%
- **Warning:** 38 90% 55%
- **Danger:** 0 65% 55%
- **Background:** 220 15% 10% (Deep blue-tinted dark)
- **Surface:** 220 12% 14%
- **Text Primary:** 220 10% 95%
- **Text Secondary:** 220 8% 70%
- **Border:** 220 12% 22%

### B. Typography

**Font Families:**
- **Primary (UI & Body):** Inter (Google Fonts) - excellent readability for forms and questions
- **Monospace (Timer):** JetBrains Mono (Google Fonts) - clear digit differentiation

**Type Scale:**
- Hero Heading: text-4xl md:text-5xl, font-bold (Landing page title)
- Page Title: text-3xl md:text-4xl, font-semibold (Subject name on exam page)
- Section Heading: text-2xl font-semibold (Results sections)
- Question Text: text-lg md:text-xl leading-relaxed (Primary content)
- Option Text: text-base md:text-lg (Answer choices)
- Body Text: text-base (Forms, descriptions)
- Small Text: text-sm (Footer, disclaimers)
- Timer Display: text-2xl md:text-3xl font-mono font-bold

**Line Heights:** Use relaxed line heights (1.6-1.8) for all question and option text to reduce eye strain during prolonged reading.

### C. Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24** for consistent spacing
- Micro spacing (form fields, inline elements): p-2, gap-2, space-y-2
- Component spacing (cards, sections): p-6 md:p-8, gap-6, space-y-6
- Section spacing (page sections): py-12 md:py-16, space-y-12
- Large spacing (page separation): py-16 md:py-24

**Container Strategy:**
- Landing page: max-w-md mx-auto (centered form, ~28rem)
- Exam interface: max-w-4xl mx-auto (optimal reading width, ~56rem)
- Results page: max-w-3xl mx-auto (~48rem)

**Grid Systems:**
- Landing form: Single column on all breakpoints
- Exam interface: Single column focus (question + options)
- Results: 2-column grid on md+ for data pairs (label: value)

### D. Component Library

**Navigation & Controls:**
- **Header (Exam):** Fixed top bar with Timer (left), Question counter (center), Subject name (right). Background: surface color with subtle border-b. Height: h-16. Shadow on scroll.
- **Footer (Landing):** Simple centered text with contact email, text-sm, py-8
- **Back/Next Buttons:** Large tap targets (min-w-32 h-12), primary blue for Next, outline gray for Back. Disabled state: opacity-40 cursor-not-allowed
- **Submit Button:** Prominent danger red (bg-red-500), large (px-8 py-4), positioned bottom-right or centered
- **Radio Buttons:** Large custom styled (w-5 h-5), clear checked state with primary color fill, labels text-lg with pl-3

**Forms:**
- **Input Fields:** Full width, h-12, border-2, rounded-lg, focus:ring-2 focus:ring-primary, px-4, text-base
- **Select Dropdowns:** Same styling as inputs, with down arrow icon
- **Labels:** text-sm font-medium mb-2 block, text-secondary color
- **Validation:** Inline error messages in danger red, text-sm, mt-1

**Cards & Surfaces:**
- **Landing Card:** bg-surface, shadow-lg, rounded-2xl, p-8 md:p-12, border border-border
- **Question Card:** bg-surface, shadow-md, rounded-xl, p-6 md:p-8
- **Option Cards:** Individual bg-surface cards with border-2, rounded-lg, p-4, hover:border-primary, transition, cursor-pointer. Selected state: border-primary bg-primary/5
- **Result Card:** bg-surface, shadow-lg, rounded-xl, p-8, border-2 border-success (for pass) or border-danger (for fail)

**Modals & Overlays:**
- **Pre-check Modal:** Centered overlay with backdrop blur, max-w-lg, bg-surface, rounded-2xl, p-8, shadow-2xl
- **Confirmation Modal:** Same styling, with clear Yes/Cancel button pair
- **Backdrop:** bg-black/50 backdrop-blur-sm

**Data Display:**
- **Question Palette (Grid):** Compact grid of question numbers (grid-cols-5 md:grid-cols-10), each cell w-10 h-10, rounded, border. Answered: bg-primary text-white. Current: border-2 border-primary. Unanswered: border-border bg-background
- **Timer:** Prominent display in header, monospace font, larger size on desktop. Color transitions: normal (text-primary) → yellow at 5min → red at 2min with pulse animation
- **Progress Bar:** Thin bar below header showing answered/total progress, h-1, bg-primary

**Feedback Elements:**
- **Success Toast:** Green background, white text, rounded-lg, shadow-lg, slide-in animation
- **Warning Banner:** Yellow background for offline mode or focus warnings
- **Loading States:** Skeleton screens for question loading, spinner for submit processing

### E. Responsive Behavior

**Breakpoints:**
- Mobile (base): Single column, larger touch targets (min-h-12), simplified timer display
- Tablet (md: 768px): Two-column results, expanded timer, show question palette
- Desktop (lg: 1024px): Optimal reading width maintained, spacious padding

**Touch Optimization:**
- All interactive elements minimum 44×44px tap target
- Radio options with full-width clickable area including label
- Navigation buttons: full width on mobile (flex-col gap-4), inline on desktop

---

## Page-Specific Designs

### Landing Page

**Layout:**
- 4-second video preloader (full viewport overlay with dark background)
- After preload: Centered card design on calm background gradient (from primary/5 to primary/10)
- Vertical form layout with generous spacing (space-y-6)
- Logo/Title at top: "ComputCBT" with tagline "Professional Computer-Based Testing"

**Form Elements:**
1. Full Name: Text input with placeholder "Enter your full name"
2. Gender: Select dropdown (Male/Female) with placeholder "Select gender"
3. Subject: Select dropdown with all 15 subjects alphabetically sorted, placeholder "Choose your subject"
4. Start Exam: Large primary button, w-full, h-14, text-lg font-semibold, rounded-lg
5. Footer: Contact email in text-sm text-secondary, pt-8

**Validation:** Inline error messages appear below each field on blur/submit attempt

### Exam Interface

**Structure:**
- Fixed header (timer, question counter, subject)
- Main content area: Question card + Options cards (space-y-4)
- Question palette: Collapsible sidebar on desktop, bottom sheet on mobile
- Fixed bottom bar: Back and Next buttons with current question indicator between them

**Question Display:**
- Question number badge (top-left of card): "Question 5 of 50" - bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium
- Question text: Large, readable font (text-lg md:text-xl) with ample line spacing
- Options: Stacked vertical cards with radio button + label, generous padding for easy clicking

**Timer Behavior:**
- Normal state: Calm display in header-right
- < 5 minutes: Yellow color + subtle glow
- < 2 minutes: Red color + pulse animation + optional sound alert (optional toggle)
- At 0: Auto-submit immediately with modal showing "Time's up! Submitting your exam..."

### Results Page

**Hero Section:**
- Large success icon (checkmark circle) or neutral icon (document)
- Congratulatory message: "Exam Completed!" (text-3xl font-bold)
- Score display (hero): "42/50" (text-6xl font-bold text-primary) with percentage below (text-2xl text-secondary)

**Details Grid (2-column on md+):**
- Full Name, Gender, Subject, Time Taken, Score, Percentage
- Each as label-value pair with clear visual separation

**Action Buttons:**
- Download Result (primary button)
- Review Answers (outline button)
- Retake Exam (secondary button)

**Answer Review (if toggled):**
- Question-by-question list with student's answer vs. correct answer
- Visual indicators: Green checkmark (correct), Red X (wrong), Gray dash (unanswered)

---

## Accessibility Specifications

- **Keyboard Navigation:** Full tab order support, Enter to select radio options, arrow keys within radio groups
- **ARIA Labels:** All interactive elements properly labeled, live regions for timer and question updates
- **Focus Indicators:** 2px solid ring in primary color with 2px offset
- **Screen Reader:** Announce question changes, timer warnings, and submission confirmations
- **Color Contrast:** All text meets WCAG AA (4.5:1 minimum for normal text, 3:1 for large text)
- **Skip Links:** "Skip to question" link for screen readers in exam interface

---

## Animations & Transitions

**Minimal, Purposeful Motion:**
- Page transitions: 300ms ease-in-out fade
- Button hovers: 150ms ease transform scale(1.02)
- Modal entry: 200ms ease-out slide-up with backdrop fade
- Timer pulse (< 2min): 1s ease-in-out infinite scale
- Toast notifications: 300ms slide-in from top-right
- Question change: 200ms cross-fade

**No distracting animations during exam** - keep user focused on content.

---

## Images

**Video Preloader:** 4-second branded animation showing ComputCBT logo with subtle motion (scaling/fade). Background: dark (220 15% 10%) with primary accent glow.

**No hero images** - This platform prioritizes function over visual marketing. The landing page uses a clean centered form design without imagery to maintain focus on exam initiation.

**Icons:**
- Use Heroicons (outline style) for UI elements
- Timer icon: clock
- Success: check-circle
- Warning: exclamation-triangle  
- Danger: exclamation-circle
- Navigation: chevron-left, chevron-right
- Palette: view-grid
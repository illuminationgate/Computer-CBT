# ComputCBT - Computer-Based Testing Platform

## Overview

ComputCBT is a professional computer-based testing platform designed for delivering WAEC/NECO-style multiple-choice examinations. The system provides a secure, timed examination environment across 15 subjects with features including offline capability, auto-save functionality, and instant results. The platform emphasizes accessibility, distraction-free testing, and exam integrity through single-session enforcement and tab-switch monitoring.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Components**: 
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design system
- Custom theme system supporting light/dark modes optimized for exam environments

**State Management**:
- TanStack Query (React Query) for server state management
- React Hook Form with Zod for form validation and type safety
- Local state for exam navigation and answer tracking

**Routing**: wouter for lightweight client-side routing

**Key Design Decisions**:
- Single-page application architecture to prevent navigation-based data loss
- Component-based architecture for reusability (Timer, QuestionPalette, PreCheckModal)
- Custom theme provider for persistent dark/light mode preferences
- Video preloader for branding/loading experience
- Mobile-responsive design with adaptive UI components
- **Timer counts DOWN from exam duration to 00:00** (shows remaining time in descending format) *[Updated: Oct 29, 2025]*
- **Questions fetched using session ID to receive deterministic shuffle** *[Updated: Oct 29, 2025]*
- **Question Navigator repositioned to footer with 20-column grid layout on desktop** (shows 3 rows for 50 questions, 10 columns on mobile) *[Updated: Nov 2, 2025]*
- **Navigation panel at page bottom with Previous/Next buttons above Question Navigator grid** *[Updated: Nov 2, 2025]*

### Backend Architecture

**Framework**: Express.js with TypeScript

**API Design**: RESTful API with the following core endpoints:
- `/api/start-exam` - Creates student record and exam session
- `/api/exam-session/:sessionId` - Retrieves exam session details (includes status, startTime, endTime, timeTaken) *[Fixed: Oct 29, 2025]*
- `/api/exam-session/:sessionId/start` - Starts exam timer and sets session to in_progress
- `/api/questions/session/:sessionId` - Retrieves shuffled questions for exam session (deterministic shuffle based on session ID, renumbered sequentially 1-N) *[Added: Oct 29, 2025]*
- `/api/results/:sessionId` - Fetches exam results

**Data Access Layer**: 
- Storage abstraction pattern (IStorage interface) for database operations
- Separation of concerns between routes, storage layer, and database client

**Key Design Decisions**:
- Request/response logging middleware for debugging
- Error handling middleware for consistent error responses
- Session-based exam tracking with status management (pending, in_progress, completed, auto_submitted)
- Separation of student creation and exam session initialization
- **Deterministic question shuffling per session** - Each student gets questions in randomized order, but same session always returns same shuffle; questions are renumbered sequentially (1, 2, 3...) after shuffle for consistent display *[Added: Oct 29, 2025]*
- **English Language, Literature in English, Financial Accounting, and Mathematics questions are NOT shuffled** - Special handling to preserve question order for these subjects as questions are grouped by type, based on passages, or contain complex mathematical expressions that should maintain their original sequence *[Updated: Nov 4, 2025]*
- **Instruction field for passage-based questions** - Questions can include optional instruction text to display passages, poems, or extracts above the question (used in English Language, Literature in English, and Financial Accounting) *[Updated: Nov 3, 2025]*

### Data Storage

**Database**: PostgreSQL (configured for Neon serverless)

**ORM**: Drizzle ORM with type-safe schema definitions

**Schema Design**:
- `students` - Student registration information (name, gender)
- `subjects` - Subject configurations (name, duration, question count)
- `questions` - Question bank with options, correct answers, and optional instruction field for passage-based questions
- `examSessions` - Tracks individual exam attempts with timing and scoring
- `answers` - Stores student responses with auto-save support

**Key Decisions**:
- UUID primary keys for all tables
- Cascading deletes to maintain referential integrity
- Separate answers table for granular response tracking
- Session status enum for exam lifecycle management
- Time tracking in both timestamp and duration formats

**Data Seeding**:
- Separate seed scripts for subjects and questions
- PDF-based question import system for bulk loading exam content
- JSON-based batch import system for efficient question seeding
- Idempotent seeding with validation and duplicate prevention
- 15 predefined subjects matching WAEC/NECO curriculum with accurate durations:
  - **Seeded subjects (15 total, 790 questions)**:
    - Agriculture (50 questions, 50 min) *[Existing]*
    - Biology (50 questions, 50 min) *[Existing]*
    - Chemistry (50 questions, 60 min) *[Existing]*
    - Christian Religious Studies (50 questions, 60 min) *[Existing]*
    - Civic Education (50 questions, 60 min) *[Existing]*
    - Commerce (50 questions, 50 min) *[Added: Oct 28, 2025]*
    - Computer (50 questions, 60 min) *[Added: Oct 28, 2025]*
    - Economics (50 questions, 60 min) *[Added: Oct 28, 2025]*
    - English Language (80 questions, 60 min, NOT shuffled) *[Added: Nov 2, 2025]*
    - Financial Accounting (60 questions with 5 options, 60 min, NOT shuffled, with passage-based questions) *[Updated: Nov 3, 2025]*
    - Government (50 questions, 60 min) *[Added: Oct 28, 2025]*
    - Islamic Studies (50 questions, 50 min) *[Added: Oct 28, 2025]*
    - Literature in English (50 questions, 60 min, NOT shuffled, with passage-based questions) *[Added: Nov 2, 2025]*
    - Mathematics (50 questions, 90 min, NOT shuffled, with mathematical expressions preserved) *[Updated: Nov 4, 2025]*
    - Physics (50 questions, 75 min) *[Added: Oct 28, 2025]*
  - **All subjects fully seeded!** *[Completed: Nov 2, 2025]*
  - **Durations updated to match WAEC/NECO standards** *[Updated: Oct 28, 2025]*

**Seeding Instructions**:
1. Run `tsx server/seed-all-new-subjects.ts` to seed all 8 new subjects (410 questions)
2. Seeds are idempotent - can be run multiple times safely (duplicate questions are skipped)
3. Validation ensures question data integrity (correct array length, valid answers, non-empty text)
4. Unique constraint on (subject_id, question_number) prevents duplicate questions

### External Dependencies

**Database Services**:
- Neon Serverless PostgreSQL for production database hosting
- WebSocket support via `ws` package for Neon connection pooling

**UI Libraries**:
- Radix UI for accessible component primitives
- Lucide React for iconography
- embla-carousel-react for potential carousel functionality
- cmdk for command palette interfaces

**Form & Validation**:
- React Hook Form for form state management
- Zod for runtime type validation
- @hookform/resolvers for Zod integration

**Utilities**:
- date-fns for time/date manipulation
- clsx and tailwind-merge for conditional className handling
- class-variance-authority for component variant management

**Development Tools**:
- Replit-specific plugins for development environment integration
- esbuild for production server bundling
- tsx for TypeScript execution in development

**Fonts**: Google Fonts (Inter for UI/body text, JetBrains Mono for timer display)

**Session Management**: connect-pg-simple for PostgreSQL-backed session storage (configured but implementation details not fully visible in provided files)

**Key Integration Points**:
- Drizzle Kit for database migrations
- Vite plugins for React, runtime error handling, and Replit tooling
- Express middleware for JSON parsing and request logging
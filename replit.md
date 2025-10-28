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

### Backend Architecture

**Framework**: Express.js with TypeScript

**API Design**: RESTful API with the following core endpoints:
- `/api/start-exam` - Creates student record and exam session
- `/api/exam-session/:sessionId` - Retrieves exam session details
- `/api/results/:sessionId` - Fetches exam results

**Data Access Layer**: 
- Storage abstraction pattern (IStorage interface) for database operations
- Separation of concerns between routes, storage layer, and database client

**Key Design Decisions**:
- Request/response logging middleware for debugging
- Error handling middleware for consistent error responses
- Session-based exam tracking with status management (pending, in_progress, completed, auto_submitted)
- Separation of student creation and exam session initialization

### Data Storage

**Database**: PostgreSQL (configured for Neon serverless)

**ORM**: Drizzle ORM with type-safe schema definitions

**Schema Design**:
- `students` - Student registration information (name, gender)
- `subjects` - Subject configurations (name, duration, question count)
- `questions` - Question bank with options and correct answers
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
- 15 predefined subjects matching WAEC/NECO curriculum:
  - **Seeded subjects (13 total, 660 questions = 250 existing + 410 new)**:
    - Agriculture (50 questions) *[Existing]*
    - Biology (50 questions) *[Existing]*
    - Chemistry (50 questions) *[Existing]*
    - Christian Religious Studies (50 questions) *[Existing]*
    - Civic Education (50 questions) *[Existing]*
    - Commerce (50 questions) *[Added: Oct 28, 2025]*
    - Computer (50 questions) *[Added: Oct 28, 2025]*
    - Economics (50 questions) *[Added: Oct 28, 2025]*
    - Financial Accounting (60 questions with 5 options) *[Added: Oct 28, 2025]*
    - Government (50 questions) *[Added: Oct 28, 2025]*
    - Islamic Studies (50 questions) *[Added: Oct 28, 2025]*
    - Mathematics (50 questions) *[Added: Oct 28, 2025]*
    - Physics (50 questions) *[Added: Oct 28, 2025]*
  - **Pending subjects**: English, Literature in English

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
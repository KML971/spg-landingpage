# Spectrum Groupe Migration Assessment – Current State

## 1. Overview

This repository contains a single-page landing experience for an **Atlassian Data Center → Cloud migration assessment**.

The application:
- Presents a marketing-style hero for Spectrum Groupe.
- Runs a **4-step survey wizard** to assess migration complexity.
- Computes a **score and classification** (Standard / Advanced / Enterprise) with an estimated timeline.
- Persists responses to **Supabase Postgres** for lead capture and analytics.
- Generates a **PDF report** of the assessment result for the user to download.

The UI is implemented as a Vite-powered React SPA with internal state-driven views rather than URL routing.

---

## 2. Tech Stack

- **Runtime / Framework**
  - Vite 5 (`vite`) with React 18 and TypeScript.
  - StrictMode React root (`src/main.tsx`).
- **UI / Styling**
  - Tailwind CSS 3 with a custom **Spectrum** color palette and Inter font (`tailwind.config.js`).
  - `lucide-react` for icons.
  - `framer-motion` for wizard step transitions.
- **Data / Backend**
  - Supabase (Postgres + Row Level Security) via `@supabase/supabase-js` v2.
  - Single main table: `survey_responses` (see Data & Persistence below).
- **Reporting**
  - `jspdf` for client-side PDF generation.
- **Tooling**
  - TypeScript 5 (`tsconfig*.json`).
  - ESLint 9 + `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.

NPM scripts (from `package.json`):
- `dev`: run Vite dev server.
- `build`: build production bundle.
- `preview`: preview production build.
- `lint`: run ESLint.
- `typecheck`: `tsc --noEmit` using `tsconfig.app.json`.

---

## 3. Application Architecture

### 3.1 Entry & Composition

- **`src/main.tsx`**
  - Mounts React to `#root` using `createRoot`.
  - Renders `<App />` inside `React.StrictMode`.

- **`src/App.tsx`** – top-level orchestration component.
  - Local state:
    - `appState: 'hero' | 'survey' | 'results'` – controls which section is visible.
    - `surveyData: SurveyData | null` – completed survey payload.
    - `surveyResult: SurveyResult | null` – score/classification.
  - Layout:
    - Always shows `Header` and `Footer`.
    - Conditionally shows:
      - `Hero` (landing) when `appState === 'hero'`.
      - `Wizard` (survey) when `appState === 'survey'`.
      - `ResultsPage` (score + PDF + consultants) when `appState === 'results'` and data is available.

### 3.2 Key Components

- **Header (`src/components/Header.tsx`)**
  - Sticky top navigation with basic, non-functional menu items (all `href="#"`).
  - Mobile menu toggle with `Menu` / `X` icons.

- **Hero (`src/components/Hero.tsx`)**
  - Marketing messaging about Atlassian cloud readiness.
  - CTA button **“Start My Assessment”** calls `onStartAssessment`, moving `App` to `survey` state and scrolling the wizard into view.

- **Survey Wizard (`src/components/Survey/Wizard.tsx`)**
  - Manages survey progression with four steps:
    1. **Step1_Environment** – products, hosting, users, instances.
    2. **Step2_Apps** – marketplace apps, critical apps, workflows, integrations.
    3. **Step3_Security** – sensitive data, compliance, IT team.
    4. **Step4_Strategy** – migration approach, timeline, recent audit, contact info.
  - Internal state:
    - `currentStep: 1..4`.
    - `data: SurveyData` – initialized with empty values.
  - `canProceed()` gating logic ensures mandatory questions are filled before moving on.
  - Uses `framer-motion` `AnimatePresence` for animated step transitions.
  - On final step, `onComplete(data)` is called when `canProceed()` is true.

- **Results (`src/components/Results`)**
  - `ResultsPage` wraps:
    - `ScoreCard` – displays classification, score, and explanation.
    - Download button invoking `generatePDFReport(data, result)`.
    - `ConsultantBooking` – allows selecting a consultant and triggers `onBooking` to update Supabase with consultant info.

- **Footer (`src/components/Footer.tsx`)**
  - Brand footer with links placeholders (Legal Notice, Privacy Policy).

---

## 4. User Flow

1. **Landing**
   - User arrives on hero section.
   - Clicks **“Start My Assessment”**.

2. **Survey**
   - Wizard anchors into view.
   - User completes 4 steps (environment → apps → security → strategy & contact details).
   - Each step must meet minimal completion rules (`canProceed`) before enabling **Next/Submit**.

3. **Submission & Persistence**
   - On completion, `App.handleSurveyComplete`:
     - Calculates `SurveyResult` via `calculateScore(data)`.
     - Saves data + result into Supabase table `survey_responses`.
     - Transitions `appState` to `results` and scrolls to top.

4. **Results & PDF**
   - User sees classification, score, and summary.
   - User can download a timestamped PDF report.
   - User can select a consultant region/person; this updates the last response row for their email.

The entire flow is client-side; no server-side rendering or routing is used.

---

## 5. Data Model

### 5.1 Frontend Types (`src/types/survey.ts`)

- **`SurveyData`** – captures all survey answers, including:
  - Environment: `productsUsed[]`, `hostingType`, `userCount`, `instanceCount`.
  - Apps & integrations: `marketplaceApps`, `criticalApps[]`, `customWorkflows`, `appCategories[]`, `integrations[]`.
  - Security & governance: `sensitiveData`, `complianceStandards[]`, `itTeam`, `ssoRequirements`.
  - Migration strategy: `migrationApproach`, `timelinePreference`, `recentAudit`.
  - Contact: `userName`, `userEmail`, `companyName`.

- **`SurveyResult`** – scoring output:
  - `score: number` (0–66 capped).
  - `classification: 'Standard' | 'Advanced' | 'Enterprise'`.
  - `estimatedTimeline: string`.
  - `characteristics: string[]` – short bullet list explaining the score.

- **`Consultant`** – used for consultant selection.

### 5.2 Survey Metadata (`src/constants/surveyData.ts`)

- Static arrays defining options for products, hosting types, counts, etc.
- `CONSULTANTS` list with name, region, expertise, flags, and optional `calendlyUrl` (currently empty).

---

## 6. Scoring Logic (`src/utils/scoring.ts`)

- `calculateScore(SurveyData): SurveyResult`:
  - Adds weighted points for:
    - User count thresholds.
    - Instance count thresholds.
    - Marketplace app usage.
    - Presence of specific critical apps (ScriptRunner, BigPicture, Xray, Tempo).
    - Custom workflow intensity.
    - Integrations (chat, devops, ERP/CRM/DB connectors).
    - Sensitive data and compliance requirements.
    - IT team availability.
    - Migration approach and recent audit.
  - Builds a `characteristics` string array describing key complexity drivers.
  - Determines classification & timeline:
    - **Standard**: score ≤ 25 → `4–8 weeks`.
    - **Advanced**: 26–45 → `8–16 weeks`.
    - **Enterprise**: > 45 → `16–32 weeks` plus extra complexity characteristics.
  - Caps `score` at **66** and trims `characteristics` to at most 6 entries.

This logic is entirely client-side and deterministic.

---

## 7. Reporting (`src/utils/pdfGenerator.ts`)

- Uses `jsPDF` to generate a multi-section PDF:
  - Title and subtitle for the migration assessment.
  - Company and contact details (name, email, company, date).
  - A highlighted score (`score/66`) and classification with color coding.
  - Platform characteristics (from `result.characteristics`).
  - Environment details: products, hosting, users, instances, apps level, workflows, migration approach, timeline.
  - "Next steps" list and footer branding.
- File name pattern: `spectrum-migration-assessment-<company-slug>-<YYYY-MM-DD>.pdf`.

All generation happens in-browser; no data is sent to any PDF service.

---

## 8. Supabase & Persistence

### 8.1 Client Setup (`src/lib/supabase.ts`)

- Creates a Supabase client with:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Both values are expected to come from the root `.env` file (or build environment).

### 8.2 Environment Configuration (`.env`)

- Root `.env` defines Vite-style env vars (prefixed with `VITE_`).
- For production, these should be injected via CI/CD or hosting provider, not committed to version control.

### 8.3 Database Schema (`supabase/migrations/...create_survey_responses_table.sql`)

Main table: **`survey_responses`**

Key columns (subset):
- Identification & meta:
  - `id uuid PRIMARY KEY DEFAULT gen_random_uuid()`.
  - `created_at timestamptz DEFAULT now()`.
- Lead info:
  - `user_name`, `user_email`, `company_name` (text, NOT NULL).
- Environment & apps:
  - `products_used jsonb`, `hosting_type`, `user_count`, `instance_count`, `marketplace_apps`, `critical_apps jsonb`, `custom_workflows`, `app_categories jsonb`, `integrations jsonb`.
- Security & governance:
  - `sensitive_data boolean`, `compliance_standards jsonb`, `it_team`, `sso_requirements`.
- Strategy & scoring:
  - `migration_approach`, `timeline_preference`, `recent_audit boolean`.
  - `calculated_score integer`, `classification`, `estimated_timeline`.
- Consultant info:
  - `selected_consultant`, `consultant_region`.

Indexes:
- On `user_email`, `created_at DESC`, and `classification` for segmentation and querying.

Row Level Security (RLS):
- Enabled on `survey_responses`.
- Policies:
  - **Insert**: `anon` and `authenticated` roles can insert (public form submissions).
  - **Select**: `authenticated` can read all responses (for internal dashboards / admin).

### 8.4 Application Writes

- On survey completion (`handleSurveyComplete` in `App.tsx`):
  - Inserts a new row with all `SurveyData` fields and computed score/classification/timeline.

- On consultant selection (`handleConsultantBooking`):
  - Updates the **most recent** row (by `created_at`) for the given `user_email` with `selected_consultant` and `consultant_region`.

---

## 9. Styling & Theming

- Tailwind base is imported via `src/index.css` (`@tailwind base; @tailwind components; @tailwind utilities;`).
- `tailwind.config.js` defines custom colors:
  - `spectrum-yellow`, `spectrum-yellow-dark`, `spectrum-green`, `spectrum-orange`, `spectrum-purple`, `spectrum-blue`.
- Global sans-serif font family is set to Inter.
- Components use a consistent card-like UI and brand colors in buttons, headers, and badges.

---

## 10. Current Limitations & Notes

- **No URL routing**
  - Application state is driven by internal React state only (`appState`), not the URL.
  - Deep linking to specific steps or results is not currently supported.

- **SSO requirements not yet surfaced in UI**
  - `ssoRequirements` exists in `SurveyData` and is persisted to Supabase, but there is no current survey question populating it.

- **Consultant booking integration**
  - `Consultant` type includes a `calendlyUrl` field, but current consultant entries have empty URLs and booking appears to be limited to recording selection in Supabase plus a confirmation alert.

- **Error handling & resilience**
  - Failures when inserting or updating Supabase records are logged to `console.error`, but the user experience is not adjusted (no retries or user-facing error messages).

- **Security hygiene**
  - Ensure `.env` (containing Supabase anon key and URL) is **not committed** in production repositories and is covered by `.gitignore`.

This document reflects the code and configuration found in the repository at the time of generation and should be updated as new features, flows, or integrations are added.

/*
  # Create survey_responses table for Migration Assessment

  1. New Tables
    - `survey_responses`
      - `id` (uuid, primary key) - Unique identifier for each survey response
      - `created_at` (timestamptz) - Timestamp when the survey was submitted
      - `user_name` (text) - Name of the person taking the survey
      - `user_email` (text) - Email address for follow-up
      - `company_name` (text) - Company name
      - `products_used` (jsonb) - Array of Atlassian products (Jira, Confluence, JSM, Bitbucket)
      - `hosting_type` (text) - Current hosting (Data Center, Server, Hybrid)
      - `user_count` (text) - Number of users (<500, 500-1000, >1000)
      - `instance_count` (text) - Number of instances (1, 2, 5, >5)
      - `marketplace_apps` (text) - Usage level (None, A few, Many)
      - `critical_apps` (jsonb) - Array of critical apps selected
      - `custom_workflows` (text) - Custom workflow intensity (No, Some, Intensive)
      - `app_categories` (jsonb) - Specific app categories used
      - `integrations` (jsonb) - Integration tools selected
      - `sensitive_data` (boolean) - Whether they handle sensitive/regulated data
      - `compliance_standards` (jsonb) - Compliance requirements (GDPR, ISO 27001, etc.)
      - `it_team` (text) - IT team availability (Yes, Partial, No)
      - `sso_requirements` (text) - SSO implementation status
      - `migration_approach` (text) - Preferred migration type
      - `timeline_preference` (text) - Desired timeline
      - `recent_audit` (boolean) - Whether a recent audit was done
      - `calculated_score` (integer) - Complexity score out of 66
      - `classification` (text) - Migration classification (Standard, Advanced, Enterprise)
      - `estimated_timeline` (text) - Estimated timeline in weeks
      - `selected_consultant` (text) - Name of consultant selected
      - `consultant_region` (text) - Region of selected consultant
  
  2. Security
    - Enable RLS on `survey_responses` table
    - Add policy for public inserts (form submissions)
    - Add policy for authenticated reads (admin access)

  3. Indexes
    - Index on email for lead tracking
    - Index on created_at for chronological queries
    - Index on classification for segmentation
*/

CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_name text NOT NULL,
  user_email text NOT NULL,
  company_name text NOT NULL,
  products_used jsonb DEFAULT '[]'::jsonb,
  hosting_type text DEFAULT '',
  user_count text DEFAULT '',
  instance_count text DEFAULT '',
  marketplace_apps text DEFAULT '',
  critical_apps jsonb DEFAULT '[]'::jsonb,
  custom_workflows text DEFAULT '',
  app_categories jsonb DEFAULT '[]'::jsonb,
  integrations jsonb DEFAULT '[]'::jsonb,
  sensitive_data boolean DEFAULT false,
  compliance_standards jsonb DEFAULT '[]'::jsonb,
  it_team text DEFAULT '',
  sso_requirements text DEFAULT '',
  migration_approach text DEFAULT '',
  timeline_preference text DEFAULT '',
  recent_audit boolean DEFAULT false,
  calculated_score integer DEFAULT 0,
  classification text DEFAULT '',
  estimated_timeline text DEFAULT '',
  selected_consultant text DEFAULT '',
  consultant_region text DEFAULT ''
);

ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit survey responses"
  ON survey_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all survey responses"
  ON survey_responses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_survey_responses_email ON survey_responses(user_email);
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_survey_responses_classification ON survey_responses(classification);
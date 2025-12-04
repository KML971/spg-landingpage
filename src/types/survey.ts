export interface SurveyData {
  productsUsed: string[];
  hostingType: string;
  userCount: string;
  instanceCount: string;
  marketplaceApps: string;
  criticalApps: string[];
  customWorkflows: string;
  appCategories: string[];
  integrations: string[];
  sensitiveData: boolean;
  complianceStandards: string[];
  itTeam: string;
  ssoRequirements: string;
  migrationApproach: string;
  timelinePreference: string;
  recentAudit: boolean;
  userName: string;
  userEmail: string;
  companyName: string;
}

export interface SurveyResult {
  score: number;
  classification: 'Standard' | 'Advanced' | 'Enterprise';
  estimatedTimeline: string;
  characteristics: string[];
}

export interface Consultant {
  name: string;
  region: string;
  regions: string[];
  expertise: string;
  imagePlaceholder: string;
  calendlyUrl: string;
  flags: string[];
}

export type Step = 1 | 2 | 3 | 4;

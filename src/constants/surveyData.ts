import { Consultant } from '../types/survey';

export const CONSULTANTS: Consultant[] = [
  {
    name: 'Jean',
    region: 'France',
    regions: ['France', 'EU'],
    expertise: 'Expert in Enterprise Transformations',
    imagePlaceholder: 'JN',
    calendlyUrl: '',
    flags: ['🇫🇷'],
  },
  {
    name: 'Dave',
    region: 'UK',
    regions: ['UK', 'United Kingdom'],
    expertise: 'Specialist in Financial Compliance',
    imagePlaceholder: 'DV',
    calendlyUrl: '',
    flags: ['🇬🇧'],
  },
  {
    name: 'Karen',
    region: 'UAE - KSA',
    regions: ['UAE', 'KSA', 'Saudi Arabia', 'United Arab Emirates'],
    expertise: 'Expert in Government & Public Sector',
    imagePlaceholder: 'KR',
    calendlyUrl: '',
    flags: ['🇦🇪', '🇸🇦'],
  },
  {
    name: 'Mohamed',
    region: 'Africa',
    regions: ['Africa', 'Tunisia', 'Morocco', 'Algeria', 'Egypt'],
    expertise: 'Specialist in Large Scale Deployments',
    imagePlaceholder: 'MH',
    calendlyUrl: '',
    flags: ['🇹🇳', '🇨🇮'],
  },
];

export const PRODUCTS = [
  { id: 'jira', label: 'Jira Software' },
  { id: 'confluence', label: 'Confluence' },
  { id: 'jsm', label: 'Jira Service Management' },
  { id: 'bitbucket', label: 'Bitbucket' },
];

export const HOSTING_TYPES = [
  { id: 'datacenter', label: 'Data Center' },
  { id: 'server', label: 'Server' },
  { id: 'hybrid', label: 'Hybrid' },
];

export const USER_COUNTS = [
  { id: '<500', label: 'Less than 500 users' },
  { id: '500-1000', label: '500 to 1,000 users' },
  { id: '>1000', label: 'More than 1,000 users' },
];

export const INSTANCE_COUNTS = [
  { id: '1', label: '1 instance' },
  { id: '2', label: '2 instances' },
  { id: '5', label: '5 instances' },
  { id: '>5', label: 'More than 5 instances' },
];

export const MARKETPLACE_APP_LEVELS = [
  { id: 'none', label: 'No' },
  { id: 'dont-know', label: "I don't know" },
  { id: 'few', label: 'Yes, a few' },
  { id: 'many', label: 'Yes, several' },
];

export const CRITICAL_APPS = [
  { id: 'tempo', label: 'Timesheet (e.g., Tempo Timesheet)' },
  { id: 'scriptrunner', label: 'Scripting (e.g., Scriptrunner, Misc)' },
  { id: 'xray', label: 'Test Management (e.g., XRay, Zephyr)' },
  { id: 'bigpicture', label: 'Project Management (e.g., ProjectTrack, Structure, BigPicture)' },
  { id: 'assets', label: 'Assets Management / CMDB (e.g., Asset, Device42)' },
];

export const CUSTOM_WORKFLOW_LEVELS = [
  { id: 'no', label: 'No' },
  { id: 'dont-know', label: "I don't know" },
  { id: 'some', label: 'Yes, a few' },
  { id: 'intensive', label: 'Yes, intensively' },
];

export const INTEGRATIONS = [
  { id: 'none', label: 'None' },
  { id: 'chat', label: 'Chat Tools: Slack / Teams' },
  { id: 'devops', label: 'DevOps Tools: GitHub / GitLab / Jenkins' },
  { id: 'erp-crm', label: 'Connectors to other data sources: ERP / CRM / Databases / Custom Dev' },
];

export const IT_TEAM_LEVELS = [
  { id: 'yes', label: 'Yes' },
  { id: 'partial', label: 'Partial' },
  { id: 'no', label: 'No' },
];

export const COMPLIANCE_STANDARDS = [
  { id: 'gdpr', label: 'GDPR' },
  { id: 'iso27001', label: 'ISO 27001' },
  { id: 'none', label: 'None' },
];

export const MIGRATION_APPROACHES = [
  { id: 'lift-shift', label: 'Lift & Shift' },
  { id: 'selective', label: 'Selective' },
  { id: 'phased', label: 'Phased' },
  { id: 'merge', label: 'Merge' },
];

export const TIMELINES = [
  { id: 'imminent', label: 'Imminent' },
  { id: '3months', label: '3 months' },
  { id: '6months', label: '6 months' },
  { id: 'no-rush', label: 'No rush' },
];

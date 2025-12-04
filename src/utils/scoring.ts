import { SurveyData, SurveyResult } from '../types/survey';

export function calculateScore(data: SurveyData): SurveyResult {
  let score = 0;
  const characteristics: string[] = [];

  if (data.userCount === '>1000') {
    score += 10;
    characteristics.push('Large user base (>1000 users)');
  } else if (data.userCount === '500-1000') {
    score += 5;
    characteristics.push('Medium user base (500-1000 users)');
  }

  if (data.instanceCount === '>5') {
    score += 15;
    characteristics.push('Multiple instances to merge');
  } else if (data.instanceCount === '5') {
    score += 10;
    characteristics.push('Several instances');
  } else if (data.instanceCount === '2') {
    score += 5;
    characteristics.push('Two instances');
  }

  if (data.marketplaceApps === 'many') {
    score += 10;
    characteristics.push('Numerous marketplace apps');
  } else if (data.marketplaceApps === 'few') {
    score += 5;
  }

  if (data.criticalApps.includes('scriptrunner')) {
    score += 8;
    characteristics.push('Critical scripting apps (ScriptRunner)');
  }
  if (data.criticalApps.includes('bigpicture')) {
    score += 7;
    characteristics.push('Advanced project management apps');
  }
  if (data.criticalApps.includes('xray')) {
    score += 5;
  }
  if (data.criticalApps.includes('tempo')) {
    score += 4;
  }

  if (data.customWorkflows === 'intensive') {
    score += 12;
    characteristics.push('Intensive custom workflows & scripts');
  } else if (data.customWorkflows === 'some') {
    score += 6;
  }

  if (data.integrations.includes('erp-crm')) {
    score += 8;
    characteristics.push('ERP / CRM / DevOps integrations');
  } else if (data.integrations.includes('devops')) {
    score += 5;
  } else if (data.integrations.includes('chat')) {
    score += 2;
  }

  if (data.sensitiveData) {
    score += 5;
    characteristics.push('Sensitive or regulated data');
  }

  if (data.complianceStandards.includes('gdpr') || data.complianceStandards.includes('iso27001')) {
    score += 6;
    characteristics.push('Compliance requirements (GDPR/ISO 27001)');
  }

  if (data.itTeam === 'no') {
    score += 4;
  } else if (data.itTeam === 'partial') {
    score += 2;
  }

  if (data.migrationApproach === 'phased') {
    score += 5;
    characteristics.push('Phased migration approach required');
  } else if (data.migrationApproach === 'merge') {
    score += 6;
  }

  if (!data.recentAudit) {
    score += 3;
  }

  let classification: 'Standard' | 'Advanced' | 'Enterprise';
  let estimatedTimeline: string;

  if (score <= 25) {
    classification = 'Standard';
    estimatedTimeline = '4-8 weeks';
  } else if (score <= 45) {
    classification = 'Advanced';
    estimatedTimeline = '8-16 weeks';
    if (!characteristics.includes('Numerous marketplace apps') && data.marketplaceApps === 'few') {
      characteristics.push('Apps assessment needed');
    }
  } else {
    classification = 'Enterprise';
    estimatedTimeline = '16-32 weeks';
    if (!characteristics.some(c => c.includes('volumin'))) {
      characteristics.push('Very large instance or multiple instances to merge');
    }
    if (!characteristics.some(c => c.includes('critical'))) {
      characteristics.push('Numerous critical apps');
    }
    characteristics.push('High added value to structure target environment');
  }

  return {
    score: Math.min(score, 66),
    classification,
    estimatedTimeline,
    characteristics: characteristics.slice(0, 6),
  };
}

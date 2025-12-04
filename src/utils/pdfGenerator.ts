import { jsPDF } from 'jspdf';
import { SurveyData, SurveyResult } from '../types/survey';

export function generatePDFReport(data: SurveyData, result: SurveyResult) {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  pdf.setFontSize(24);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Atlassian Cloud Migration', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  pdf.setFontSize(20);
  pdf.setTextColor(100, 100, 100);
  pdf.text('Assessment Report', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Company: ${data.companyName}`, 20, yPosition);
  yPosition += 8;
  pdf.text(`Contact: ${data.userName}`, 20, yPosition);
  yPosition += 8;
  pdf.text(`Email: ${data.userEmail}`, 20, yPosition);
  yPosition += 8;
  pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPosition);
  yPosition += 15;

  pdf.setDrawColor(255, 193, 7);
  pdf.setLineWidth(1);
  pdf.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 15;

  pdf.setFontSize(16);
  pdf.setTextColor(33, 150, 243);
  pdf.text('Your Migration Complexity Score', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(36);
  const color = result.classification === 'Standard' ? [76, 175, 80] :
                result.classification === 'Advanced' ? [255, 152, 0] : [156, 39, 176];
  pdf.setTextColor(color[0], color[1], color[2]);
  pdf.text(`${result.score}/66`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Classification: Migration ${result.classification}`, pageWidth / 2, yPosition, {
    align: 'center',
  });
  yPosition += 8;
  pdf.text(`Estimated Timeline: ${result.estimatedTimeline}`, pageWidth / 2, yPosition, {
    align: 'center',
  });
  yPosition += 20;

  pdf.setFontSize(16);
  pdf.setTextColor(33, 150, 243);
  pdf.text('Platform Characteristics', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);
  result.characteristics.forEach((char, index) => {
    if (yPosition > pageHeight - 30) {
      pdf.addPage();
      yPosition = 20;
    }
    pdf.text(`${index + 1}. ${char}`, 25, yPosition);
    yPosition += 7;
  });

  yPosition += 10;

  pdf.setFontSize(16);
  pdf.setTextColor(33, 150, 243);
  pdf.text('Environment Details', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);

  if (yPosition > pageHeight - 60) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.text(`Products: ${data.productsUsed.join(', ') || 'None selected'}`, 25, yPosition);
  yPosition += 7;
  pdf.text(`Hosting: ${data.hostingType}`, 25, yPosition);
  yPosition += 7;
  pdf.text(`Users: ${data.userCount}`, 25, yPosition);
  yPosition += 7;
  pdf.text(`Instances: ${data.instanceCount}`, 25, yPosition);
  yPosition += 7;
  pdf.text(`Marketplace Apps: ${data.marketplaceApps}`, 25, yPosition);
  yPosition += 7;
  pdf.text(`Custom Workflows: ${data.customWorkflows}`, 25, yPosition);
  yPosition += 7;
  pdf.text(`Migration Approach: ${data.migrationApproach}`, 25, yPosition);
  yPosition += 7;
  pdf.text(`Timeline Preference: ${data.timelinePreference}`, 25, yPosition);
  yPosition += 15;

  pdf.setFontSize(16);
  pdf.setTextColor(33, 150, 243);
  pdf.text('Next Steps', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);
  const nextSteps = [
    '1. Review this assessment with your team',
    '2. Schedule a consultation with a Spectrum Groupe expert',
    '3. Develop a detailed migration plan',
    '4. Begin your cloud transformation journey',
  ];

  nextSteps.forEach((step) => {
    if (yPosition > pageHeight - 30) {
      pdf.addPage();
      yPosition = 20;
    }
    pdf.text(step, 25, yPosition);
    yPosition += 7;
  });

  if (yPosition > pageHeight - 40) {
    pdf.addPage();
    yPosition = 20;
  } else {
    yPosition = pageHeight - 35;
  }

  pdf.setDrawColor(255, 193, 7);
  pdf.setLineWidth(0.5);
  pdf.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text('Spectrum Groupe - Atlassian Platinum Partner', pageWidth / 2, yPosition, {
    align: 'center',
  });
  yPosition += 5;
  pdf.text('Contact: contact@spectrumgroupe.com', pageWidth / 2, yPosition, {
    align: 'center',
  });
  yPosition += 5;
  pdf.text(`© ${new Date().getFullYear()} Spectrum Groupe. All rights reserved.`, pageWidth / 2, yPosition, {
    align: 'center',
  });

  const filename = `spectrum-migration-assessment-${data.companyName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(filename);
}

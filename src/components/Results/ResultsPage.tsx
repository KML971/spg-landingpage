import { Download } from 'lucide-react';
import { SurveyData, SurveyResult } from '../../types/survey';
import { generatePDFReport } from '../../utils/pdfGenerator';
import ScoreCard from './ScoreCard';
import ConsultantBooking from './ConsultantBooking';

interface ResultsPageProps {
  data: SurveyData;
  result: SurveyResult;
  onBooking: (consultantName: string, region: string) => void;
}

export default function ResultsPage({ data, result, onBooking }: ResultsPageProps) {
  const handleDownloadPDF = () => {
    generatePDFReport(data, result);
  };

  return (
    <div>
      <ScoreCard result={result} />

      <div className="bg-white py-8 flex justify-center">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-3 bg-spectrum-navy hover:bg-spectrum-blue text-white font-bold px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          <Download size={24} />
          Download Your Assessment Report
        </button>
      </div>

      <ConsultantBooking onBooking={onBooking} />
    </div>
  );
}

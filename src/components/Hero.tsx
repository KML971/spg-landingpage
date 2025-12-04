import { ArrowDown, Award, Cloud, TrendingUp } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
}

export default function Hero({ onStartAssessment }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Is Your Atlassian Data Center
            <br />
            <span className="text-spectrum-blue">Platform Cloud-Ready?</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Join over 75% of Atlassian customers who have already moved. Get a free,
            personalized migration complexity score in less than 7 minutes.
          </p>

          <button
            onClick={onStartAssessment}
            className="inline-flex items-center gap-2 bg-spectrum-yellow hover:bg-spectrum-yellow-dark text-gray-900 font-bold px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start My Assessment
            <ArrowDown className="animate-bounce" size={20} />
          </button>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <Award className="text-spectrum-blue mb-3" size={48} />
              <h3 className="font-bold text-gray-900 mb-2">Atlassian Platinum Partner</h3>
              <p className="text-sm text-gray-600">Certified excellence</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <Cloud className="text-spectrum-green mb-3" size={48} />
              <h3 className="font-bold text-gray-900 mb-2">Cloud Specialized</h3>
              <p className="text-sm text-gray-600">Migration experts</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <TrendingUp className="text-spectrum-orange mb-3" size={48} />
              <h3 className="font-bold text-gray-900 mb-2">50+ Successful Migrations</h3>
              <p className="text-sm text-gray-600">Proven track record</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

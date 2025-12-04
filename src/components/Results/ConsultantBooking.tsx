import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { CONSULTANTS } from '../../constants/surveyData';

interface ConsultantBookingProps {
  onBooking: (consultantName: string, region: string) => void;
}

export default function ConsultantBooking({ onBooking }: ConsultantBookingProps) {
  const [selectedConsultant, setSelectedConsultant] = useState(CONSULTANTS[0]);

  const detectRegion = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone.includes('Europe/London')) return CONSULTANTS[1];
    if (timezone.includes('Asia/Dubai') || timezone.includes('Asia/Riyadh')) return CONSULTANTS[2];
    if (timezone.includes('Africa')) return CONSULTANTS[3];
    return CONSULTANTS[0];
  };

  useState(() => {
    const detected = detectRegion();
    setSelectedConsultant(detected);
  });

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discuss with Spectrum Groupe?
          </h2>
          <p className="text-xl text-gray-600">
            Take advantage of a{' '}
            <span className="font-semibold text-spectrum-yellow">
              personalized and free analysis
            </span>{' '}
            for up to 1 hour with our Cloud Migration Expert.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Experts</h3>
          <div className="flex justify-center gap-4 flex-wrap mb-8">
            {CONSULTANTS.map((consultant) => (
              <button
                key={consultant.name}
                onClick={() => setSelectedConsultant(consultant)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedConsultant.name === consultant.name
                    ? 'bg-spectrum-yellow text-gray-900 ring-4 ring-spectrum-yellow ring-opacity-30'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-spectrum-yellow'
                }`}
              >
                {consultant.name} - {consultant.region}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-spectrum-blue to-spectrum-green flex items-center justify-center text-white text-6xl font-bold mb-6 shadow-lg">
                  {selectedConsultant.imagePlaceholder}
                </div>
                <div className="flex gap-2 mb-4">
                  {selectedConsultant.flags.map((flag, index) => (
                    <span key={index} className="text-4xl">
                      {flag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedConsultant.name}
                </h3>
                <p className="text-lg text-gray-600 text-center">{selectedConsultant.region}</p>
              </div>

              <div>
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Expertise</h4>
                  <p className="text-lg text-gray-700">{selectedConsultant.expertise}</p>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Coverage</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedConsultant.regions.map((region) => (
                      <span
                        key={region}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (selectedConsultant.calendlyUrl) {
                      window.open(selectedConsultant.calendlyUrl, '_blank');
                    } else {
                      onBooking(selectedConsultant.name, selectedConsultant.region);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-spectrum-yellow hover:bg-spectrum-yellow-dark text-gray-900 font-bold px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  <Calendar size={24} />
                  Book a 1-Hour Strategy Call with {selectedConsultant.name}
                </button>

                {selectedConsultant.calendlyUrl ? (
                  <p className="mt-3 text-sm text-center text-gray-500">
                    Choose a convenient time slot
                  </p>
                ) : (
                  <p className="mt-3 text-sm text-center text-gray-500">
                    We'll contact you shortly to schedule your consultation
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">
            Our experts will help you design the optimal migration strategy for your unique
            environment
          </p>
        </div>
      </div>
    </section>
  );
}

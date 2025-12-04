import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle } from 'lucide-react';
import { SurveyResult } from '../../types/survey';

interface ScoreCardProps {
  result: SurveyResult;
}

export default function ScoreCard({ result }: ScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = result.score / 30;
      const animation = setInterval(() => {
        current += increment;
        if (current >= result.score) {
          setAnimatedScore(result.score);
          clearInterval(animation);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, 30);
      return () => clearInterval(animation);
    }, 500);
    return () => clearTimeout(timer);
  }, [result.score]);

  const getScoreColor = () => {
    if (result.classification === 'Standard') return 'text-spectrum-green';
    if (result.classification === 'Advanced') return 'text-spectrum-orange';
    return 'text-spectrum-purple';
  };

  const getGaugeColor = () => {
    if (result.classification === 'Standard') return '#8BF700';
    if (result.classification === 'Advanced') return '#FF5700';
    return '#8F24F0';
  };

  const percentage = (result.score / 66) * 100;
  const angle = (percentage / 100) * 180;

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Assessment Complete: Your Platform Positioning
          </h2>
          <p className="text-xl text-gray-600">Based on our assessment framework</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-64 h-32 mb-8">
                <svg className="w-full h-full" viewBox="0 0 200 100">
                  <path
                    d="M 10 100 A 90 90 0 0 1 190 100"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M 10 100 A 90 90 0 0 1 190 100"
                    fill="none"
                    stroke={getGaugeColor()}
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * percentage) / 100}
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 - (283 * percentage) / 100 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />

                  <motion.line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="20"
                    stroke="#374151"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: angle }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ transformOrigin: '100px 100px' }}
                  />

                  <circle cx="100" cy="100" r="8" fill="#374151" />
                </svg>

                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="text-center mb-4">
                    <div className={`text-5xl font-bold ${getScoreColor()}`}>
                      {animatedScore}
                      <span className="text-2xl text-gray-400">/66</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Your Score</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-spectrum-green"></div>
                  <span className="text-gray-700">Standard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-spectrum-orange"></div>
                  <span className="text-gray-700">Advanced</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-spectrum-purple"></div>
                  <span className="text-gray-700">Enterprise</span>
                </div>
              </div>

              <div className="w-full max-w-md">
                <div className="flex items-center justify-center gap-4 p-6 bg-spectrum-navy rounded-lg text-white">
                  <Calendar size={48} />
                  <div>
                    <div className="text-sm opacity-90">Estimated Timeline</div>
                    <div className="text-3xl font-bold">{result.estimatedTimeline}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What characterizes your platform:
              </h3>
              <div className="space-y-3">
                {result.characteristics.map((char, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-200"
                  >
                    <CheckCircle className="text-spectrum-green flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{char}</span>
                  </motion.div>
                ))}
              </div>

              <div className={`mt-8 p-6 rounded-lg ${
                result.classification === 'Standard'
                  ? 'bg-green-50 border-2 border-spectrum-green'
                  : result.classification === 'Advanced'
                  ? 'bg-orange-50 border-2 border-spectrum-orange'
                  : 'bg-purple-50 border-2 border-spectrum-purple'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle
                    className={result.classification === 'Standard' ? 'text-spectrum-green' : result.classification === 'Advanced' ? 'text-spectrum-orange' : 'text-spectrum-purple'}
                    size={24}
                  />
                  <h4 className="text-xl font-bold text-gray-900">
                    Migration {result.classification}
                  </h4>
                </div>
                <p className="text-gray-700">
                  {result.classification === 'Standard' && 'Green light for a straightforward migration.'}
                  {result.classification === 'Advanced' && 'Moderate complexity with app assessment needed.'}
                  {result.classification === 'Enterprise' && 'High complexity requiring phased approach and strategic planning.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

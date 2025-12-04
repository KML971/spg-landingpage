import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { SurveyData, Step } from '../../types/survey';
import Step1_Environment from './Step1_Environment';
import Step2_Apps from './Step2_Apps';
import Step3_Security from './Step3_Security';
import Step4_Strategy from './Step4_Strategy';

interface WizardProps {
  onComplete: (data: SurveyData) => void;
}

const STEP_TITLES = [
  'Current Environment',
  'Apps, Integrations & Scripts',
  'Security & Compliance',
  'Migration Strategy',
];

export default function Wizard({ onComplete }: WizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [data, setData] = useState<SurveyData>({
    productsUsed: [],
    hostingType: '',
    userCount: '',
    instanceCount: '',
    marketplaceApps: '',
    criticalApps: [],
    customWorkflows: '',
    appCategories: [],
    integrations: [],
    sensitiveData: false,
    complianceStandards: [],
    itTeam: '',
    ssoRequirements: '',
    migrationApproach: '',
    timelinePreference: '',
    recentAudit: false,
    userName: '',
    userEmail: '',
    companyName: '',
  });

  const totalSteps = STEP_TITLES.length;
  const progress = (currentStep / totalSteps) * 100;

  const updateData = (updates: Partial<SurveyData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.productsUsed.length > 0 && data.hostingType && data.userCount && data.instanceCount;
      case 2:
        return data.marketplaceApps && data.customWorkflows;
      case 3:
        return data.itTeam;
      case 4:
        return data.migrationApproach && data.timelinePreference && data.userName && data.userEmail && data.companyName;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (canProceed()) {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-spectrum-navy/5 py-12" id="survey">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1 text-sm text-gray-600">
              <span>Progress</span>
              <span>
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-spectrum-yellow transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            {STEP_TITLES.map((title, index) => {
              const stepNumber = (index + 1) as Step;
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;

              return (
                <div key={stepNumber} className="flex-1 relative">
                  <div className="flex items-center">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                        ${isActive ? 'bg-spectrum-yellow text-gray-900 ring-4 ring-spectrum-yellow ring-opacity-30' : ''}
                        ${isCompleted ? 'bg-spectrum-green text-white' : ''}
                        ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-600' : ''}
                      `}
                    >
                      {isCompleted ? <Check size={20} /> : stepNumber}
                    </div>
                    {index < STEP_TITLES.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 transition-all ${
                          isCompleted ? 'bg-spectrum-green' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="text-xs mt-2 text-center hidden sm:block">
                    {title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 min-h-[600px]">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {STEP_TITLES[currentStep - 1]}
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && <Step1_Environment data={data} updateData={updateData} />}
              {currentStep === 2 && <Step2_Apps data={data} updateData={updateData} />}
              {currentStep === 3 && <Step3_Security data={data} updateData={updateData} />}
              {currentStep === 4 && <Step4_Strategy data={data} updateData={updateData} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all
              ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all
              ${
                canProceed()
                  ? 'bg-spectrum-yellow hover:bg-spectrum-yellow-dark text-gray-900'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {currentStep === 4 ? 'Submit' : 'Next'}
            {currentStep === 4 ? <Check size={20} /> : <ArrowRight size={20} />}
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Step {currentStep} of 4
        </div>
      </div>
    </section>
  );
}

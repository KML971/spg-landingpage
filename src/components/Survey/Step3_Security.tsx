import { SurveyData } from '../../types/survey';
import { COMPLIANCE_STANDARDS, IT_TEAM_LEVELS } from '../../constants/surveyData';

interface Step3Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

export default function Step3_Security({ data, updateData }: Step3Props) {
  const toggleCompliance = (standardId: string) => {
    const newStandards = data.complianceStandards.includes(standardId)
      ? data.complianceStandards.filter((s) => s !== standardId)
      : [...data.complianceStandards, standardId];
    updateData({ complianceStandards: newStandards });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Do you handle sensitive or regulated data?
        </h3>
        <div className="space-y-3">
          <label
            className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
            style={{
              borderColor: data.sensitiveData === true ? '#FFC900' : '#e5e7eb',
            }}
          >
            <input
              type="radio"
              name="sensitiveData"
              checked={data.sensitiveData === true}
              onChange={() => updateData({ sensitiveData: true })}
              className="w-5 h-5 text-spectrum-yellow focus:ring-spectrum-yellow"
            />
            <span className="ml-3 text-gray-900 font-medium">Yes</span>
          </label>

          <label
            className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
            style={{
              borderColor: data.sensitiveData === false ? '#FFC900' : '#e5e7eb',
            }}
          >
            <input
              type="radio"
              name="sensitiveData"
              checked={data.sensitiveData === false}
              onChange={() => updateData({ sensitiveData: false })}
              className="w-5 h-5 text-spectrum-yellow focus:ring-spectrum-yellow"
            />
            <span className="ml-3 text-gray-900 font-medium">No</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          What compliance standards do you follow?
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {COMPLIANCE_STANDARDS.map((standard) => (
            <label
              key={standard.id}
              className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
              style={{
                borderColor: data.complianceStandards.includes(standard.id)
                  ? '#FFC900'
                  : '#e5e7eb',
              }}
            >
              <input
                type="checkbox"
                checked={data.complianceStandards.includes(standard.id)}
                onChange={() => toggleCompliance(standard.id)}
                className="w-5 h-5 text-spectrum-yellow rounded focus:ring-spectrum-yellow"
              />
              <span className="ml-3 text-gray-900 font-medium">{standard.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Do you have a dedicated IT team?
        </h3>
        <div className="space-y-3">
          {IT_TEAM_LEVELS.map((level) => (
            <label
              key={level.id}
              className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
              style={{
                borderColor: data.itTeam === level.id ? '#FFC900' : '#e5e7eb',
              }}
            >
              <input
                type="radio"
                name="itTeam"
                checked={data.itTeam === level.id}
                onChange={() => updateData({ itTeam: level.id })}
                className="w-5 h-5 text-spectrum-yellow focus:ring-spectrum-yellow"
              />
              <span className="ml-3 text-gray-900 font-medium">{level.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

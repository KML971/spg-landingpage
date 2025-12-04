import { SurveyData } from '../../types/survey';
import { MIGRATION_APPROACHES, TIMELINES } from '../../constants/surveyData';

interface Step4Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

export default function Step4_Strategy({ data, updateData }: Step4Props) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          What is your preferred migration approach?
        </h3>
        <div className="space-y-3">
          {MIGRATION_APPROACHES.map((approach) => (
            <label
              key={approach.id}
              className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
              style={{
                borderColor: data.migrationApproach === approach.id ? '#FFC900' : '#e5e7eb',
              }}
            >
              <input
                type="radio"
                name="migrationApproach"
                checked={data.migrationApproach === approach.id}
                onChange={() => updateData({ migrationApproach: approach.id })}
                className="w-5 h-5 text-spectrum-yellow focus:ring-spectrum-yellow"
              />
              <span className="ml-3 text-gray-900 font-medium">{approach.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          What is your desired timeline?
        </h3>
        <div className="space-y-3">
          {TIMELINES.map((timeline) => (
            <label
              key={timeline.id}
              className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
              style={{
                borderColor: data.timelinePreference === timeline.id ? '#FFC900' : '#e5e7eb',
              }}
            >
              <input
                type="radio"
                name="timelinePreference"
                checked={data.timelinePreference === timeline.id}
                onChange={() => updateData({ timelinePreference: timeline.id })}
                className="w-5 h-5 text-spectrum-yellow focus:ring-spectrum-yellow"
              />
              <span className="ml-3 text-gray-900 font-medium">{timeline.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Have you conducted a recent audit of your environment?
        </h3>
        <div className="space-y-3">
          <label
            className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
            style={{
              borderColor: data.recentAudit === true ? '#FFC900' : '#e5e7eb',
            }}
          >
            <input
              type="radio"
              name="recentAudit"
              checked={data.recentAudit === true}
              onChange={() => updateData({ recentAudit: true })}
              className="w-5 h-5 text-spectrum-yellow focus:ring-spectrum-yellow"
            />
            <span className="ml-3 text-gray-900 font-medium">Yes</span>
          </label>

          <label
            className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
            style={{
              borderColor: data.recentAudit === false ? '#FFC900' : '#e5e7eb',
            }}
          >
            <input
              type="radio"
              name="recentAudit"
              checked={data.recentAudit === false}
              onChange={() => updateData({ recentAudit: false })}
              className="w-5 h-5 text-spectrum-yellow focus:ring-spectrum-yellow"
            />
            <span className="ml-3 text-gray-900 font-medium">No</span>
          </label>
        </div>
      </div>

      <div className="border-t pt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Contact Information</h3>
        <p className="text-sm text-gray-600 mb-6">
          To receive your personalized assessment, please provide your details:
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="userName"
              value={data.userName}
              onChange={(e) => updateData({ userName: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-spectrum-yellow focus:ring-spectrum-yellow focus:outline-none"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              value={data.companyName}
              onChange={(e) => updateData({ companyName: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-spectrum-yellow focus:ring-spectrum-yellow focus:outline-none"
              placeholder="Acme Corporation"
              required
            />
          </div>

          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="userEmail"
              value={data.userEmail}
              onChange={(e) => updateData({ userEmail: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-spectrum-yellow focus:ring-spectrum-yellow focus:outline-none"
              placeholder="john.doe@company.com"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

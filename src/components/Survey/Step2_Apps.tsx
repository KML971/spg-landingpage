import { SurveyData } from '../../types/survey';
import {
  MARKETPLACE_APP_LEVELS,
  CRITICAL_APPS,
  CUSTOM_WORKFLOW_LEVELS,
  INTEGRATIONS,
} from '../../constants/surveyData';

interface Step2Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

export default function Step2_Apps({ data, updateData }: Step2Props) {
  const toggleCriticalApp = (appId: string) => {
    const newApps = data.criticalApps.includes(appId)
      ? data.criticalApps.filter((a) => a !== appId)
      : [...data.criticalApps, appId];
    updateData({ criticalApps: newApps });
  };

  const toggleAppCategory = (categoryId: string) => {
    const newCategories = data.appCategories.includes(categoryId)
      ? data.appCategories.filter((c) => c !== categoryId)
      : [...data.appCategories, categoryId];
    updateData({ appCategories: newCategories });
  };

  const toggleIntegration = (integrationId: string) => {
    const newIntegrations = data.integrations.includes(integrationId)
      ? data.integrations.filter((i) => i !== integrationId)
      : [...data.integrations, integrationId];
    updateData({ integrations: newIntegrations });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Do you use apps from the Atlassian Marketplace?
        </h3>
        <div className="space-y-3">
          {MARKETPLACE_APP_LEVELS.map((level) => (
            <label
              key={level.id}
              className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
              style={{
                borderColor: data.marketplaceApps === level.id ? '#FFC900' : '#e5e7eb',
              }}
            >
              <input
                type="radio"
                name="marketplaceApps"
                checked={data.marketplaceApps === level.id}
                onChange={() => updateData({ marketplaceApps: level.id })}
                className="w-5 h-5 text-spectrum-yellow focus:ring-spectrum-yellow"
              />
              <span className="ml-3 text-gray-900 font-medium">{level.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Are some apps critical to your processes?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Select the types of marketplace apps you use to cover business needs:
        </p>
        <div className="grid grid-cols-1 gap-3">
          {CRITICAL_APPS.map((app) => (
            <label
              key={app.id}
              className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
              style={{
                borderColor: data.criticalApps.includes(app.id) ? '#FFC900' : '#e5e7eb',
              }}
            >
              <input
                type="checkbox"
                checked={data.criticalApps.includes(app.id)}
                onChange={() => toggleCriticalApp(app.id)}
                className="w-5 h-5 text-spectrum-yellow rounded focus:ring-spectrum-yellow mt-0.5"
              />
              <span className="ml-3 text-gray-900">{app.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Do you have custom workflows, scripts, or automations?
        </h3>
        <div className="space-y-3">
          {CUSTOM_WORKFLOW_LEVELS.map((level) => (
            <label
              key={level.id}
              className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
              style={{
                borderColor: data.customWorkflows === level.id ? '#FFC900' : '#e5e7eb',
              }}
            >
              <input
                type="radio"
                name="customWorkflows"
                checked={data.customWorkflows === level.id}
                onChange={() => updateData({ customWorkflows: level.id })}
                className="w-5 h-5 text-spectrum-yellow focus:ring-spectrum-yellow"
              />
              <span className="ml-3 text-gray-900 font-medium">{level.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Do you have integrations with other tools?
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {INTEGRATIONS.map((integration) => (
            <label
              key={integration.id}
              className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
              style={{
                borderColor: data.integrations.includes(integration.id)
                  ? '#FFC900'
                  : '#e5e7eb',
              }}
            >
              <input
                type="checkbox"
                checked={data.integrations.includes(integration.id)}
                onChange={() => toggleIntegration(integration.id)}
                className="w-5 h-5 text-spectrum-yellow rounded focus:ring-spectrum-yellow mt-0.5"
              />
              <span className="ml-3 text-gray-900">{integration.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

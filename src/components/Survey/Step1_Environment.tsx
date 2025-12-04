import { SurveyData } from '../../types/survey';
import { PRODUCTS, HOSTING_TYPES, USER_COUNTS, INSTANCE_COUNTS } from '../../constants/surveyData';

interface Step1Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

export default function Step1_Environment({ data, updateData }: Step1Props) {
  const toggleProduct = (productId: string) => {
    const newProducts = data.productsUsed.includes(productId)
      ? data.productsUsed.filter((p) => p !== productId)
      : [...data.productsUsed, productId];
    updateData({ productsUsed: newProducts });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Which Atlassian products are you currently using?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRODUCTS.map((product) => (
            <label
              key={product.id}
              className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
              style={{
                borderColor: data.productsUsed.includes(product.id)
                  ? '#FFC900'
                  : '#e5e7eb',
              }}
            >
              <input
                type="checkbox"
                checked={data.productsUsed.includes(product.id)}
                onChange={() => toggleProduct(product.id)}
                className="w-5 h-5 text-spectrum-yellow rounded focus:ring-spectrum-yellow"
              />
              <span className="ml-3 text-gray-900 font-medium">{product.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          What is your current hosting type?
        </h3>
        <div className="space-y-3">
          {HOSTING_TYPES.map((type) => (
            <label
              key={type.id}
              className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
              style={{
                borderColor: data.hostingType === type.id ? '#FFC900' : '#e5e7eb',
              }}
            >
              <input
                type="radio"
                name="hostingType"
                checked={data.hostingType === type.id}
                onChange={() => updateData({ hostingType: type.id })}
                className="w-5 h-5 text-spectrum-yellow focus:ring-spectrum-yellow"
              />
              <span className="ml-3 text-gray-900 font-medium">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          How many users do you have?
        </h3>
        <div className="space-y-3">
          {USER_COUNTS.map((count) => (
            <label
              key={count.id}
              className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
              style={{
                borderColor: data.userCount === count.id ? '#FFC900' : '#e5e7eb',
              }}
            >
              <input
                type="radio"
                name="userCount"
                checked={data.userCount === count.id}
                onChange={() => updateData({ userCount: count.id })}
                className="w-5 h-5 text-spectrum-yellow focus:ring-spectrum-yellow"
              />
              <span className="ml-3 text-gray-900 font-medium">{count.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          How many instances do you have?
        </h3>
        <div className="space-y-3">
          {INSTANCE_COUNTS.map((count) => (
            <label
              key={count.id}
              className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-spectrum-yellow transition-colors"
              style={{
                borderColor: data.instanceCount === count.id ? '#FFC900' : '#e5e7eb',
              }}
            >
              <input
                type="radio"
                name="instanceCount"
                checked={data.instanceCount === count.id}
                onChange={() => updateData({ instanceCount: count.id })}
                className="w-5 h-5 text-spectrum-yellow focus:ring-spectrum-yellow"
              />
              <span className="ml-3 text-gray-900 font-medium">{count.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

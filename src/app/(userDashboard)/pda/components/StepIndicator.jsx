export function StepIndicator({ steps, currentStep }) {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full
                ${index <= currentStep ? 'bg-secondary text-primary' : 'bg-gray-200'}
              `}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-1 mx-2
                  ${index < currentStep ? 'bg-secondary' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <span key={step} className={`
              text-sm ${index === currentStep ? 'text-secondary font-medium' : 'text-gray-500'}
            `}>
              {step}
            </span>
          ))}
        </div>
      </div>
    );
  }